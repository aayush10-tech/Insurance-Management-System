import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ==========================
  // USERS
  // ==========================

  const adminPassword = await bcrypt.hash("admin123", 10);
  const agentPassword = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@insurance.com",
    },
    update: {},
    create: {
      fullName: "System Administrator",
      email: "admin@insurance.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "aayush@example.com",
    },
    update: {},
    create: {
      fullName: "Aayush Mahadik",
      email: "aayush@example.com",
      password: agentPassword,
      role: "AGENT",
    },
  });

  console.log("✅ Users created");

  // ==========================
  // CUSTOMERS
  // ==========================

  const customers = [];

  const customerData = [
    {
      firstName: "Rahul",
      lastName: "Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "9876543201",
      gender: "Male",
      dob: new Date("1995-05-12"),
      address: "12 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      occupation: "Software Engineer",
      income: 850000,
      aadhaar: "123412341001",
      pan: "ABCDE1001F",
    },
    {
      firstName: "Priya",
      lastName: "Patel",
      email: "priya.patel@gmail.com",
      phone: "9876543202",
      gender: "Female",
      dob: new Date("1993-03-18"),
      address: "22 Park Street",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      occupation: "Teacher",
      income: 620000,
      aadhaar: "123412341002",
      pan: "ABCDE1002F",
    },
    {
      firstName: "Amit",
      lastName: "Verma",
      email: "amit.verma@gmail.com",
      phone: "9876543203",
      gender: "Male",
      dob: new Date("1990-07-22"),
      address: "14 Station Road",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440001",
      occupation: "Business",
      income: 1200000,
      aadhaar: "123412341003",
      pan: "ABCDE1003F",
    },
    {
      firstName: "Sneha",
      lastName: "Joshi",
      email: "sneha.joshi@gmail.com",
      phone: "9876543204",
      gender: "Female",
      dob: new Date("1997-01-11"),
      address: "Sunshine Apartment",
      city: "Nashik",
      state: "Maharashtra",
      pincode: "422001",
      occupation: "Doctor",
      income: 1800000,
      aadhaar: "123412341004",
      pan: "ABCDE1004F",
    },
    {
      firstName: "Rohan",
      lastName: "Kulkarni",
      email: "rohan.k@gmail.com",
      phone: "9876543205",
      gender: "Male",
      dob: new Date("1992-11-03"),
      address: "Lake View Society",
      city: "Thane",
      state: "Maharashtra",
      pincode: "400601",
      occupation: "Architect",
      income: 980000,
      aadhaar: "123412341005",
      pan: "ABCDE1005F",
    },
    {
      firstName: "Neha",
      lastName: "Mehta",
      email: "neha.mehta@gmail.com",
      phone: "9876543206",
      gender: "Female",
      dob: new Date("1996-06-08"),
      address: "Palm Residency",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      occupation: "HR Manager",
      income: 760000,
      aadhaar: "123412341006",
      pan: "ABCDE1006F",
    },
    {
      firstName: "Vikas",
      lastName: "Singh",
      email: "vikas.singh@gmail.com",
      phone: "9876543207",
      gender: "Male",
      dob: new Date("1989-09-15"),
      address: "Green Park",
      city: "Aurangabad",
      state: "Maharashtra",
      pincode: "431001",
      occupation: "Civil Engineer",
      income: 910000,
      aadhaar: "123412341007",
      pan: "ABCDE1007F",
    },
    {
      firstName: "Pooja",
      lastName: "Desai",
      email: "pooja.desai@gmail.com",
      phone: "9876543208",
      gender: "Female",
      dob: new Date("1994-12-27"),
      address: "Shivaji Nagar",
      city: "Kolhapur",
      state: "Maharashtra",
      pincode: "416003",
      occupation: "Lawyer",
      income: 1050000,
      aadhaar: "123412341008",
      pan: "ABCDE1008F",
    },
    {
      firstName: "Arjun",
      lastName: "Naik",
      email: "arjun.naik@gmail.com",
      phone: "9876543209",
      gender: "Male",
      dob: new Date("1991-08-20"),
      address: "River View",
      city: "Solapur",
      state: "Maharashtra",
      pincode: "413001",
      occupation: "Sales Manager",
      income: 690000,
      aadhaar: "123412341009",
      pan: "ABCDE1009F",
    },
    {
      firstName: "Kavita",
      lastName: "Patil",
      email: "kavita.patil@gmail.com",
      phone: "9876543210",
      gender: "Female",
      dob: new Date("1998-04-05"),
      address: "Sai Residency",
      city: "Satara",
      state: "Maharashtra",
      pincode: "415001",
      occupation: "Accountant",
      income: 580000,
      aadhaar: "123412341010",
      pan: "ABCDE1010F",
    },
  ];

  for (const c of customerData) {
    const customer = await prisma.customer.upsert({
      where: {
        email: c.email,
      },
      update: {},
      create: {
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email,
        phone: c.phone,
        gender: c.gender,
        dateOfBirth: c.dob,
        address: c.address,
        city: c.city,
        state: c.state,
        pincode: c.pincode,
        occupation: c.occupation,
        annualIncome: c.income,
        aadhaarNumber: c.aadhaar,
        panNumber: c.pan,
      },
    });

    customers.push(customer);
  }

  console.log("✅ Customers created");
    // ==========================
  // POLICIES
  // ==========================

  const policies = [];

  const policyTypes = [
    "Life Insurance",
    "Health Insurance",
    "Motor Insurance",
    "Home Insurance",
    "Travel Insurance",
    "Life Insurance",
    "Health Insurance",
    "Motor Insurance",
    "Life Insurance",
    "Health Insurance",
  ];

  const frequencies = [
    "Monthly",
    "Quarterly",
    "Half-Yearly",
    "Yearly",
    "Monthly",
    "Yearly",
    "Quarterly",
    "Monthly",
    "Yearly",
    "Half-Yearly",
  ];

  for (let i = 0; i < customers.length; i++) {
    const premium = 5000 + i * 1500;
    const coverage = premium * 100;

    const policy = await prisma.policy.create({
      data: {
        policyNumber: `POL2026${1000 + i}`,
        policyName: policyTypes[i],
        policyType: policyTypes[i],

        description: `${policyTypes[i]} policy for ${customers[i].firstName} ${customers[i].lastName}`,

        premiumAmount: premium,
        coverageAmount: coverage,

        paymentFrequency: frequencies[i],

        startDate: new Date("2026-01-01"),
        endDate: new Date("2027-01-01"),

        status: i % 4 === 0 ? "EXPIRED" : "ACTIVE",

        customerId: customers[i].id,
      },
    });

    policies.push(policy);
  }

  console.log("✅ Policies created");

  // ==========================
  // PREMIUM PAYMENTS
  // ==========================

  for (let i = 0; i < policies.length; i++) {
    await prisma.premiumPayment.create({
      data: {
        amount: policies[i].premiumAmount,

        paymentMethod:
          i % 3 === 0
            ? "UPI"
            : i % 3 === 1
            ? "Credit Card"
            : "Net Banking",

        paymentDate: new Date(),

        transactionId: `TXN2026${10000 + i}`,

        status: i % 5 === 0 ? "PENDING" : "PAID",

        remarks: "Premium payment received successfully.",

        policyId: policies[i].id,
      },
    });
  }

  console.log("✅ Premium Payments created");
    // ==========================
  // CLAIMS
  // ==========================

  for (let i = 0; i < 5; i++) {
    await prisma.claim.create({
      data: {
        claimNumber: `CLM2026${1000 + i}`,

        claimAmount: 25000 + i * 15000,

        claimReason: [
          "Accident",
          "Hospitalization",
          "Vehicle Damage",
          "Medical Emergency",
          "Fire Damage",
        ][i],

        incidentDate: new Date(
          2026,
          i,
          10 + i
        ),

        description:
          "Sample insurance claim generated for demonstration purposes.",

        status: ["PENDING", "APPROVED", "REJECTED", "APPROVED", "PENDING"][i],

        remarks: "Reviewed by insurance agent.",

        policyId: policies[i].id,
      },
    });
  }

  console.log("✅ Claims created");

  // ==========================
  // DOCUMENTS
  // ==========================

  for (let i = 0; i < customers.length; i++) {
    await prisma.document.create({
      data: {
        documentName: "Aadhaar Card",

        documentType: "Identity Proof",

        fileName: `aadhaar_${customers[i].id}.pdf`,

        filePath: `/uploads/aadhaar_${customers[i].id}.pdf`,

        mimeType: "application/pdf",

        fileSize: 245760,

        customerId: customers[i].id,
      },
    });
  }

  console.log("✅ Documents created");

  console.log("");
  console.log("======================================");
  console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
  console.log("======================================");
  console.log("");

  console.log("Login Credentials:");
  console.log("");

  console.log("ADMIN");
  console.log("Email : admin@insurance.com");
  console.log("Password : admin123");
  console.log("");

  console.log("AGENT");
  console.log("Email : aayush@example.com");
  console.log("Password : 123456");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });