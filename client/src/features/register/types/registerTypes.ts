import { registerSchema } from "../schema/registerSchema";
import { z } from "zod";

export type registerType = z.infer<typeof registerSchema>;
