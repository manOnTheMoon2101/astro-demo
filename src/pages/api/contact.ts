import type { APIRoute } from 'astro';

export const prerender = false;

interface ContactFormData {
  email: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();
    const { email } = data;
    console.log('Received data:', data);
    console.log('Email:', email);    
    if (email && email.includes('@inkblot.co.za')) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Message sent successfully!' 
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid email domain. Please use an @inkblot.co.za email address.' 
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
  } catch (error: unknown) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error occurred.' 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}