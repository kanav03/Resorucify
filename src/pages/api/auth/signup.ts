import type { NextApiRequest, NextApiResponse } from "next";
import * as argon from "argon2";
import db from "@/utils/database";
import { UrlSchemaType } from "@/utils/validator";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            res.status(400).json({
                success: false,
                message: "Invalid Request Type",
            });
            return;
        }

        const { name, email, password } = req.body;

        if (!email || !password) {
            res.status(403).json({
                success: false,
                message: "Email and Password are requrired.",
            });
            return;
        }

        const user = await (await db()).collection("users").findOne({ email });

        if (user) {
            res.status(403).json({
                success: false,
                message: "Email already exists.",
            });
            return;
        }

        const hash = await argon.hash(password);

        const newUser: UrlSchemaType = {
            name,
            email,
            hash,
            isDeleted: false,
            createdAt: new Date(),
        };

        const result = await (await db()).collection('users').insertOne(newUser);

        if (!result.acknowledged) {
            res.status(500).json({
                success: false,
                message: "Something went wrong.",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "User created successfully.",
        });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
}
