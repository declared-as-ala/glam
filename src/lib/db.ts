import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb+srv://ala:ala123@cluster0.tojwjkt.mongodb.net/glam-parapharmacie";

const cached = global.mongooseConnection ?? {
  conn: null,
  promise: null,
};

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "glam-parapharmacie",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongooseConnection = cached;
  return cached.conn;
}
