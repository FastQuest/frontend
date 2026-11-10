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
    return { source: [], sourceExamInstances: [], date: [], subject: [] };
  }

  const { sources, source_exam_instances, years, subjects } = res.data;
  const invalidFields = [
    !Array.isArray(sources) && "sources",
    !Array.isArray(source_exam_instances) && "source_exam_instances",
    !Array.isArray(years) && "years",
    !Array.isArray(subjects) && "subjects",
  ].filter((field): field is string => Boolean(field));

  if (invalidFields.length) {
    console.error("Resposta inválida ao carregar os filtros da API. Campos ausentes ou inválidos:", invalidFields);
  }

  return {
    source: (Array.isArray(sources) ? sources : []).map(s => ({ label: s.name, value: String(s.id) })),
    sourceExamInstances: (Array.isArray(source_exam_instances) ? source_exam_instances : []).map(instance => ({
      label: `${instance.year} - ${instance.edition}º Exame - Fase ${instance.phase}`,
      value: String(instance.id),
      sourceId: String(instance.source_id)
    })),
    date: (Array.isArray(years) ? years : []).map(y => ({ label: String(y), value: String(y) })),
    subject: (Array.isArray(subjects) ? subjects : []).map(s => ({ label: s.name, value: String(s.id) }))
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