import UserModel from "../models/UserModel.js"; // Импортируем модель пользователя
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Проверка на существование пользователя с таким email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    // Создание нового пользователя
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).send({
      message:"User registered successfully"
    });
  } catch (error) {
    console.error(error); // Вывод в консоль для отладки
    return res.status(500).send("Error registering user: " + error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Поиск пользователя по email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Генерация JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      "secret_key",
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ data:token });
  } catch (error) {
    res.status(500).send("Error logging in user");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const { password, ...userData } = user.toJSON();
    res.json(userData);
  } catch (err) {
    res.status(500).json({ message: "Нет доступа" });
  }
};

// export const isManager = (req, res, next) => {
//   if (req.user.role !== "manager") {
//     return res.status(403).send("Access denied");
//   }
//   next();
// };
