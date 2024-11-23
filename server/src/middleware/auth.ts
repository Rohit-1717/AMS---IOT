import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define user types (you can adjust these based on your exact user schemas)
interface IAdmin {
  role: "admin";
  id: string;
  email: string;
}

interface IFaculty {
  role: "faculty";
  id: string;
  email: string;
}

interface IStudent {
  role: "student";
  id: string;
  email: string;
}

// Union type for user roles (Admin, Faculty, or Student)
type IUser = IAdmin | IFaculty | IStudent;

// Middleware to authenticate and attach the user to the request object
const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    // Verify and decode the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      user: IUser;
    };

    // Attach the user data to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Role-checking middleware
const checkRole = (role: "admin" | "faculty" | "student") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};

export { auth, checkRole };
