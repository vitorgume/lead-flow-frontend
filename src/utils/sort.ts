import type Mensagem from "../models/mensagem";

export function compareIsoLocalDateTime(a?: string, b?: string): number {
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  // ISO local (YYYY-MM-DDTHH:mm:ss[.SSS]) mantém ordem por string
  return a < b ? -1 : a > b ? 1 : 0;
}

export function sortMensagensAsc(mensagens: Mensagem[]): Mensagem[] {
  return mensagens
    .slice()
    .sort((m1, m2) => {
      const byDate = compareIsoLocalDateTime(m1.data, m2.data);
      if (byDate !== 0) return byDate;
      // desempate estável por id (se existir)
      if (m1.id && m2.id) return m1.id.localeCompare(m2.id);
      return 0;
    });
}

export function sortMensagensAscPreservandoEmpate(mensagens: Mensagem[]): Mensagem[] {
  // anota o índice original para estabilidade
  const withIndex = mensagens.map((m, i) => ({ ...m, __i: i }));

  withIndex.sort((m1, m2) => {
    const byDate = compareIsoLocalDateTime(m1.data, m2.data);
    if (byDate !== 0) return byDate;

    // empate no mesmo timestamp → usuário antes do robô
    const p1 = m1.responsavel === "usuario" ? 0 : 1;
    const p2 = m2.responsavel === "usuario" ? 0 : 1;
    if (p1 !== p2) return p1 - p2;

    // ainda empatou? mantém ordem original
    return m1.__i - m2.__i;
  });

  // remove __i antes de retornar
  return withIndex.map(({ __i, ...m }) => m as Mensagem);
}

