#!/bin/bash

# Executa os testes com pytest
pytest

# Executa os testes com cobertura
coverage run -m pytest

# Gera um relatório HTML de cobertura
coverage html

# Abre o arquivo index.html no navegador padrão
xdg-open htmlcov/index.html  # Abre no Linux
# open htmlcov/index.html     # Abre no macOS
# start htmlcov/index.html    # Abre no Windows
