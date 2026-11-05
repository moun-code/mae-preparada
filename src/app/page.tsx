import { redirect } from 'next/navigation';

/**
 * Rota principal `/` -> abre diretamente o Quiz interativo (`/quiz`),
 * que ao final redireciona para a Landing Page personalizada (`/resultado`) e depois para o Checkout.
 */
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const query = new URLSearchParams();

  if (resolved) {
    Object.entries(resolved).forEach(([key, val]) => {
      if (typeof val === 'string') {
        query.set(key, val);
      } else if (Array.isArray(val) && val.length > 0) {
        query.set(key, val[0]);
      }
    });
  }

  const qs = query.toString();
  redirect(qs ? `/quiz?${qs}` : '/quiz');
}
