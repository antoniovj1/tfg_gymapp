#!/bin/bash

#Generación de PDF compilando el archivo LaTeX con pdflatex
pdflatex -synctex=1 -interaction=nonstopmode  proyecto.tex > /dev/null 2>&1
echo "Generados archivos auxiliares"
makeglossaries proyecto > /dev/null 2>&1
echo "Generado glosario"
pdflatex -synctex=1 -interaction=nonstopmode  proyecto.tex > /dev/null 2>&1
pdflatex -synctex=1 -interaction=nonstopmode  proyecto.tex > /dev/null 2>&1
echo "PDF -> proyecto.pdf"

rm *.aux
rm *.lof
rm *.log
rm *.lot
rm *.out
rm *.toc
rm *.ist
rm *.gls
rm *.glo
rm *.glg
rm *.synctex.gz
