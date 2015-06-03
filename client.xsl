<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/menu">
<table>
       <xsl:for-each select="item">
       <tr>
       <td><xsl:element name="a">
            <xsl:attribute name="title"><xsl:value-of select="server"/></xsl:attribute>
            <xsl:attribute name="onclick">selectClient(this)</xsl:attribute>
            <xsl:value-of select="name"/>
       </xsl:element></td></tr>
       </xsl:for-each>
</table>
</xsl:template>
</xsl:stylesheet>