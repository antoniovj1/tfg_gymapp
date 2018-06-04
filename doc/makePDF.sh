#!/bin/bash

#Generación de PDF compilando el archivo LaTeX con pdflatex
pdflatex -synctex=1 -interaction=nonstopmode  proyecto.tex > /dev/null 2>&1
echo "PDF -> proyecto.pdf"

rm *.aux
rm *.lof
rm *.log
rm *.lol
rm *.lot
rm *.out
rm *.synctex.gz
rm *toc

