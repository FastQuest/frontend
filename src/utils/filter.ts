import { questionRepository } from "@/repositories/questionRepository";

export interface SelectOption {
  label: string;
  value: string;
}

const baseOrder: SelectOption[] = [
  { label: 'Recentes', value: 'created_at desc' },
  { label: 'Mais Antigos', value: 'created_at asc' },
  { label: 'Atualizados Recentemente', value: 'updated_at desc' },
  { label: 'Menos Recentemente Atualizados', value: 'updated_at asc' },
];

const fetchDynamicFilters = async () => {
  const res = await questionRepository.getQuestionFilters(); 

  if (res.error || !res.data) {
    console.error("Erro ao carregar os filtros da API:", res.error);
    return { source: [], date: [], subject: [] };
  }

  return {
    source: res.data.sources.map(s => ({ label: `OAB Exame ${s.name}º`, value: String(s.id) })),
    date: res.data.years.map(y => ({ label: String(y), value: String(y) })),
    subject: res.data.subjects.map(s => ({ label: s.name, value: String(s.id) }))
  };
};

export const buildQuestionFilter = async () => {
  const dynamicFilters = await fetchDynamicFilters();

  return {
    ...dynamicFilters,
    order: [
      { label: 'A - Z', value: 'statement asc' },
      { label: 'Z - A', value: 'statement desc' },
      ...baseOrder
    ]
  };
}

export const buildListFilter = async () => {
  const dynamicFilters = await fetchDynamicFilters();

  return {
    ...dynamicFilters,
    order: [
      { label: 'A - Z', value: 'name asc' },
      { label: 'Z - A', value: 'name desc' },
      ...baseOrder
    ]
  };
}