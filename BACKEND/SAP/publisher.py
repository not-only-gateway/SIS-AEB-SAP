import base64
from structural.models import Unit
from associative.decentralized_unit.models import DecentralizedUnit

ted_file = open("template_ted.html", "r")

ted_template = ted_file.read()


def replace_ted(ted):
    responsible = Unit.query.get(ted.responsible)
    decentralized = DecentralizedUnit.query.get(ted.decentralized_unit)

    parsed = ted_template
    parsed = parsed.replace('${data.responsible.name}', responsible.name)
    parsed = parsed.replace('${data.number}', ted.number)
    parsed = parsed.replace('${data.year}', str(ted.year))
    parsed = parsed.replace('${data.decentralized_unit.name}', decentralized.name)
    parsed = parsed.replace('${data.decentralized_unit.competent_authority}', decentralized.competent_authority)
    parsed = parsed.replace('${data.decentralized_unit.cpf}', decentralized.cpf)
    parsed = parsed.replace('${data.decentralized_unit.responsible.name}', decentralized.unit_responsible)
    parsed = parsed.replace('${data.decentralized_unit.identification}', decentralized.identification)
    parsed = parsed.replace('${data.decentralized_unit.ug}', decentralized.ug)
    parsed = parsed.replace('${data.decentralized_unit.uge}', decentralized.uge)
    parsed = parsed.replace('${data.object}', ted.object)
    parsed = parsed.replace('${data.object_summary}', ted.object_summary)
    parsed = parsed.replace('${data.justification}', ted.justification)
    parsed = parsed.replace('${data.summary_justification}', ted.summary_justification)
    parsed = parsed.replace('${data.start_date}', ted.start_date.strftime("%m/%d/%Y"))
    parsed = parsed.replace('${data.end_date}', ted.end_date.strftime("%m/%d/%Y"))
    parsed = parsed.replace('${data.global_value}', str(ted.global_value))
    parsed = parsed.replace('${data.programmatic_functional_classification }',
                            ted.programmatic_functional_classification)
    parsed = parsed.replace('${data.remaining_assets}', 'X' if ted.remaining_assets else '')
    parsed = parsed.replace('${!data.remaining_assets}', 'X' if not ted.remaining_assets else '')
    parsed = parsed.replace('${data.ownership_destination_assets}',
                            ted.ownership_destination_assets if ted.remaining_assets else '')


    return parsed


def publish_ted_notify(ted, user):
    pass
    # data = replace_ted(ted)
    # data = base64.b64encode(bytes(data, 'utf-8')).decode('utf-8')
    # publish(
    #     method='notification',
    #     body={
    #         'title': 'SIS-AEB: ' + ted.number,
    #         'message': 'Notificação automática: TED ' + ted.number + ' criado com sucesso.',
    #         'receiver': user,
    #         'files': [{
    #             'data': str(data),
    #             'extension': 'html',
    #             'name': ted.number
    #         }]
    #     },
    #     routing='notify'
    # )
