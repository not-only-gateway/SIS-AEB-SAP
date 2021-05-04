export default {
    personal: 'Pessoal',
    education: 'Educação',
    name: 'Nome',
    father: 'Pai',
    mother: 'Mãe',
    birthPlace: 'Local de nascimento',
    nationality: 'Nacionalidade',
    disabledPerson: 'pessoa com deficiência',
    birth: 'Nascimento',
    admin: 'Administrador(a)',
    gender: 'Gênero Sexual',
    marital: 'Estado civil',
    corporateEmail: 'Email Corporativo',
    extension: 'Ramal',
    registration: 'Cadastro',
    choice: [{value: 'Sim', key: true}, {value: 'Não', key: false}],
    genderChoice: [{value: 'Masculino', key: 'MALE'}, {value: 'Feminino', key: 'FEMALE'}, {value: 'Outro', key: 'OTHER'}],
    maritalChoice: [
        {key: 'SINGLE', value: 'Solteiro'},
        {key: 'DIVORCED', value: 'Divorciado'},
        {key: 'MARRIED', value: 'Casado'},
        {key: 'WIDOWED', value: 'Viúvo(a)'}
    ],
    educationChoice: [
        {value: 'Fundamental', key: 'FUNDAMENTAL'},
        {value: 'Ensino Médio Incompleto', key: 'INCOMPLETE-HIGH-SCHOOL'},
        {value: 'Ensino Médio Completo', key: 'COMPLETE-HIGH-SCHOOL'},
        {value: 'Graduação Incompleta', key: 'INCOMPLETE-GRADUATION'},
        {value: 'Graduação Completa', key: 'COMPLETE-GRADUATION'},
        {value: 'Mestrado Incompleto', key: 'INCOMPLETE-MASTER\'S-DEGREE'},
        {value: 'Mestrado Completo', key: 'COMPLETE-MASTER\'S-DEGREE'},
        {value: 'Doutorado Incompleto', key: 'INCOMPLETE-DOCTORATE-DEGREE'},
        {value: 'Doutorado Completo', key: 'COMPLETE-DOCTORATE-DEGREE'}
    ]
}