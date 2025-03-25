---
templateKey: work
title: ericruby.com
type: Website
featuredimage:
  - https://res.cloudinary.com/candusen/image/upload/v1742925945/Screenshot_2025-03-25_at_2.05.38_PM_zurm9u.png
featured: false
draft: false
description: Photographer Eric Ruby's portfolio and archive.
postContent:
  - type: video
    video:
      - https://res.cloudinary.com/candusen/video/upload/v1742920185/Screen_Recording_2025-03-25_at_12.26.38_PM_kbciiu.mov
  - type: text
    text: Eric reached out to me with an idea he'd been nursing for a long time- to
      create a fake version of google to house his immense archive of
      photography of over 10,000 images.
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1742920174/Screenshot_2025-03-25_at_12.28.42_PM_hzneuw.png
    caption: Users can sort by a few criteria and view large-scale images or a grid
      of images.
  - type: text
    text: So we needed to make Eric's images searchable. He had already been
      *keywording* his images- adding keywords to each image's metadata for his
      own use. So I wanted to utilize these keywords and create a search index
      from them.
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1742920175/Screenshot_2025-03-25_at_12.29.14_PM_liqpi4.png
  - type: text
    text: I found a tool called [exifTool](https://exiftool.org/) which can extract
      metadata from images programmatically. Then I built a script that runs on
      Eric's server every night and goes through all of his images, extracting
      the keywords from each, and building an index data file for use by the
      website. It also creates thumbnail versions of each image so they can lazy
      load and make things run smoother.
  - type: image
    image:
      - https://res.cloudinary.com/candusen/image/upload/v1742920173/Screenshot_2025-03-25_at_12.29.22_PM_ljzwfq.png
    caption: This is an index listing every single keyword Eric has added to any of
      his images.
date: 2025-03-25T14:02:00.000Z
date-finish: 2025-03-25T14:02:00.000Z
---
