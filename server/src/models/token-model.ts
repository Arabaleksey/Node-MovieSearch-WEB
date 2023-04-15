import mongoose, { Model, Schema } from "mongoose";

export interface IToken {
  user: mongoose.SchemaDefinitionProperty<string>;
  refreshToken: String;
}

const TokenScheme = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

export const TokenModel: Model<IToken> = mongoose.model("Token", TokenScheme);
