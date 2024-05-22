from src.utils.utils import generate_template_mail


mock_info_template = {
    "name": "Gabriel", "government_id":10, "debt_amount":412, "debt_due_date":"25/05/2024", "debt_id":1
}


def test_generate_template():
    template = generate_template_mail(**mock_info_template)

    assert "Gabriel" in template
    assert "10" in template
    assert "412" in template
    assert "25/05/2024" in template
    assert "1" in template
