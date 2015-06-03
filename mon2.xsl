<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/menu">
       <xsl:for-each select="item">
       <xsl:element name="li">
            <xsl:attribute name="title"><xsl:value-of select="sql"/></xsl:attribute>
            <xsl:value-of select="name"/>
       </xsl:element>
       </xsl:for-each>
</xsl:template>
</xsl:stylesheet>