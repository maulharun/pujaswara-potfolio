import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Pesan tidak boleh kosong.' }, { status: 400 });
  }

  console.log('API KEY:', process.env.OPENROUTER_API_KEY ? 'Loaded ✅' : 'Not Loaded ❌');
  console.log('Pesan dari user:', message);

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
          { role: 'system', content: 'Kamu adalah asisten yang membantu dan menjawab dalam Bahasa Indonesia.' },
          { role: 'user', content: message },
        ],
      }),
    });

    const raw = await response.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`Gagal parsing JSON dari OpenRouter: ${raw}`);
    }

    if (!response.ok) {
      const errMsg = data.error?.message || 'Terjadi kesalahan dari OpenRouter';
      throw new Error(errMsg);
    }

    const reply = data.choices?.[0]?.message?.content ?? 'Maaf, saya tidak tahu jawabannya.';
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    let errorMessage = 'Terjadi kesalahan.';
    if (err instanceof Error) {
      console.error('Error saat memanggil OpenRouter:', err.message);
      errorMessage = err.message;
    } else {
      console.error('Error tidak diketahui saat memanggil OpenRouter:', err);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
