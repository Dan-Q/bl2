<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/rss/channel">
    <bl-carousel class="samsung-rss-feed" refresh="10000">
      <xsl:apply-templates select="item" />
    </bl-carousel>
  </xsl:template>

  <xsl:template match="item">
    <xsl:if test="(expiresat_samsung = '') or (number(expiresat_samsung) &gt; number(//rss/channel/currentDatetime))">
      <div class="samsung-rss-feed-item" data-guid="{guid}">
        <h2 class="samsung-rss-feed-item-title"><xsl:value-of select="title" /></h2>
        <p class="samsung-rss-feed-item-description_samsung">
          <xsl:if test="not(img_samsung = '')">
            <img src="{img_samsung}" class="samsung-rss-feed-item-img_samsung" />
          </xsl:if>
          <xsl:value-of select="description_samsung" />
        </p>
      </div>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
