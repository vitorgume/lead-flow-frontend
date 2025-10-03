
/**
 * Formata um telefone para o padrão: (55) 00 00000-0000
 * - Mantém apenas dígitos
 * - Garante o código do país "55" (se não vier, adiciona)
 * - Aceita 8 ou 9 dígitos de número (fixo ou celular)
 */
export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "");

  // garante prefixo do país 55
  const withCC = digits.startsWith("55") ? digits : `55${digits}`;

  // cc (2) + ddd (2) + número (8 ou 9)
  const cc = withCC.slice(0, 2);
  const rest = withCC.slice(2); // DDD + número

  const ddd = rest.slice(0, 2);
  const number = rest.slice(2);

  if (!ddd) {
    return `(${cc})`;
  }

  if (number.length <= 4) {
    // poucos dígitos ainda
    return `(${cc}) ${ddd} ${number}`;
  }

  // decide 5-4 (celular) ou 4-4 (fixo) pelo comprimento
  const firstPartLen = number.length >= 9 ? 5 : 4;
  const firstPart = number.slice(0, firstPartLen);
  const lastPart = number.slice(firstPartLen, firstPartLen + 4);

  return `(${cc}) ${ddd} ${firstPart}${lastPart ? "-" + lastPart : ""}`;
}

/**
 * Formata um Date/ISO para "HH:mm - dd/MM/yyyy"
 * Aceita Date ou string (ISO 8601 do backend Java)
 */
export function formatDateTime(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;

  if (isNaN(date.getTime())) return ""; // inválido

  const pad = (n: number) => String(n).padStart(2, "0");

  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const dd = pad(date.getDate());
  const MM = pad(date.getMonth() + 1);
  const yyyy = date.getFullYear();

  return `${hh}:${mm} - ${dd}/${MM}/${yyyy}`;
}

export function formatRegiao(regiao: string): string {
    switch(regiao) {
        case 'MARINGA':
            return 'Maringá';
        case 'REGIAO_MARINGA':
            return 'Região Maringá';
        case 'OUTRA':
            return 'Outra';
        case 'NAO_INFORMADA':
            return 'Não Informada';
        default:
            return 'N/A';
    }
}

export function formatSegmento(segmento: string): string {
    switch(segmento) {
        case 'MEDICINA_SAUDE':
            return 'Medicina e Saúde';
        case 'BOUTIQUE_LOJAS':
            return 'Boutique e Lojas';
        case 'OUTRA':
            return 'Engenharia e Arquitetura';
        case 'ALIMENTOS':
            return 'Alimentos';
        case 'CELULARES':
            return 'Celulares';
        case 'OUTROS':
            return 'Outros';
        case 'NAO_INFORMADO':
            return 'Não Informado';
        default:
            return 'N/A';
    }
}
