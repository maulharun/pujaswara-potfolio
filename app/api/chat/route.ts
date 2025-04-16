import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Unknown error');
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content ?? 'Maaf, saya tidak tahu jawabannya.';

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    let errorMessage = 'Terjadi kesalahan.';
    if (err instanceof Error) {
      console.error('Error fetching from OpenRouter:', err.message);
      errorMessage = err.message;
    } else {
      console.error('Error fetching from OpenRouter:', err);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
