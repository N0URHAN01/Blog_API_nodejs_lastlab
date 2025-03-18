const prisma = require('../lib/prisma');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

	
		if (!name || !email || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ error: "Email already in use" });
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword }
		});

		// Remove password before sending response
		const { password: _, ...userWithoutPassword } = user;

		res.status(201).json(userWithoutPassword);
	} catch (err) {
		next(err);
	}
};

// User login
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Check if all fields are provided
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		// Check if user exists
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		// Compare password
		const passwordCorrect = await bcrypt.compare(password, user.password);
		if (!passwordCorrect) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			throw new Error("JWT_SECRET is missing in .env file");
		}

		// Generate JWT token
		const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });

		
		const { password: _, ...userWithoutPassword } = user;

		res.json({ token, user: userWithoutPassword });
	} catch (err) {
		next(err);
	}
};


const getAllUsers = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				posts: { select: { title: true } }
			}
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
};

module.exports = { register, login, getAllUsers };
