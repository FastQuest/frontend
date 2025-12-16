const baseFilter = {
    order: [
      { label: 'Recentes', value: 'created_at desc' },
      { label: 'Mais Antigos', value: 'created_at asc' },
      { label: 'Atualizados Recentemente', value: 'updated_at desc' },
      { label: 'Menos Recentemente Atualizados', value: 'updated_at asc' },
    ],
    source: [
      { label: 'OAB Exame 42º', value: '2' },
      { label: 'OAB Exame 39º', value: '1' }
    ],
    date: [
      { label: '2025', value: '2025' },
      { label: '2024', value: '2024' },
      { label: '2023', value: '2023' }
    ],
    subject: [
      { label: 'Direito Constitucional', value: '1' },
      { label: 'Direito Penal', value: '2' },
      { label: 'Direito Civil', value: '3' },
      { label: 'Direito Administrativo', value: '4' },
      { label: 'Direito do Trabalho', value: '5' },
      { label: 'Direito Tributário', value: '6' }
    ]
  }

export const buildQuestionFilter = () => {
  return {
    ...baseFilter,
    order: [
      { label: 'A - Z', value: 'statement asc' },
      { label: 'Z - A', value: 'statement desc' },
      ...baseFilter.order
    ]
  }
}

export const buildListFilter = () => {
  return {
    ...baseFilter,
    order: [
      { label: 'A - Z', value: 'name asc' },
      { label: 'Z - A', value: 'name desc' },
      ...baseFilter.order
    ]
  }
}
