#JUST DO IT!
USE riego;
SELECT CodPPRenglon, Fecha, Nombre, CodPPRenglon.Des FROM (CodPPRenglon JOIN CodItemPP ON (CodPPRenglon.CodItemPP = CodItemPP.IdItemPP)) WHERE (CodPP IN (SELECT IdPPropagacion FROM CodPPropagacion) AND CodPP = 324);