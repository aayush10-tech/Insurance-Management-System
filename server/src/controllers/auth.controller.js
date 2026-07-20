import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, "All fields are required"));
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Email already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(
      new ApiResponse(201, "User registered successfully", {
        user: userWithoutPassword,
      })
    );
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json(new ApiResponse(500, "Internal Server Error"));
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Email and password are required"));
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Invalid email or password"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Invalid email or password"));
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json(
      new ApiResponse(200, "Login successful", {
        token,
        user: userWithoutPassword,
      })
    );
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json(new ApiResponse(500, "Internal Server Error"));
  }
};