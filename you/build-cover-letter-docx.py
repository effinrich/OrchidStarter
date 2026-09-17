#!/usr/bin/env python3
"""Convert a plain cover-letter markdown file (paragraphs separated by blank lines,
no markdown formatting) into a clean, ATS-safe .docx: black text, Arial, single column.
Usage: python3 you/build-cover-letter-docx.py you/cover-letter-future.md
Outputs to /tmp/pdfout/<same-basename>.docx
"""
import zipfile, html, os, sys, re

def esc(t): return html.escape(t, quote=False)

def main(src_path):
    text = open(src_path).read()
    # drop the leading "# Title" line if present
    lines = text.split("\n")
    if lines and lines[0].startswith("# "):
        lines = lines[1:]
    # drop a following "(meta note)" line, e.g. "(Send as-is. No tailoring required.)"
    while lines and lines[0].strip() == "":
        lines = lines[1:]
    if lines and lines[0].strip().startswith("(") and lines[0].strip().endswith(")"):
        lines = lines[1:]
    body = "\n".join(lines).strip()
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", body) if p.strip()]

    def rune(t, sz=21):
        return f'<w:r><w:rPr><w:sz w:val="{sz}"/></w:rPr><w:t xml:space="preserve">{esc(t)}</w:t></w:r>'
    def para(text, after=200):
        return (f'<w:p><w:pPr><w:spacing w:after="{after}" w:line="264" w:lineRule="auto"/></w:pPr>'
                f'{rune(text)}</w:p>')

    B = [para(p) for p in paragraphs]
    document = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'
        + "".join(B) +
        '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>'
        '</w:body></w:document>')

    CT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'
    RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
    DR = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
    ST = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="000000"/></w:rPr></w:rPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>'

    os.makedirs("/tmp/pdfout", exist_ok=True)
    base = os.path.splitext(os.path.basename(src_path))[0]
    out = f"/tmp/pdfout/{base}.docx"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", CT)
        z.writestr("_rels/.rels", RELS)
        z.writestr("word/document.xml", document)
        z.writestr("word/_rels/document.xml.rels", DR)
        z.writestr("word/styles.xml", ST)

    import xml.etree.ElementTree as ET
    ET.fromstring(document)
    print(f"built {out} ({len(paragraphs)} paragraphs)")
    return out

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: build-cover-letter-docx.py <path-to-cover-letter.md>")
        sys.exit(1)
    main(sys.argv[1])
