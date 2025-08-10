import { google } from "googleapis";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { link } = req.body;
  if (!link) return res.status(400).json({ error: "Missing file/folder link" });

  const match = link.match(/[-\w]{25,}/);
  if (!match) return res.status(400).json({ error: "Invalid Google Drive link" });

  const fileId = match[0];

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const drive = google.drive({ version: "v3", auth });

    // Copy the file
    const copyResult = await drive.files.copy({
      fileId,
      requestBody: { name: `Copy of ${fileId}` },
    });

    res.status(200).json({ success: true, fileId: copyResult.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
