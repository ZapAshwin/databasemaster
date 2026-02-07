import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", 
      { pinataContent: data, pinataMetadata: { name: "database_master_v1" } },
      { headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` } }
    );
    return NextResponse.json({ hash: res.data.IpfsHash });
  } catch (error) {
    return NextResponse.json({ error: "Pinata Upload Failed" }, { status: 500 });
  }
}
