export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, status } = body;
    
    // Log to server terminal
    console.log(`[Backend Connection - Server Log] ${message} (Status: ${status})`);
    
    return Response.json({ logged: true });
  } catch (error) {
    console.error("[Backend Connection - Server Log] Error:", error);
    return Response.json({ error: "Failed to log" }, { status: 500 });
  }
}
