---
layout: post
title: 'Building a simple company website the Hard Way: Typography intro'
date: 2018-09-03T10:00:00.000+01:00
author: Filip Vařecha
lang: en
tags:
- typography
- sass
- css
- fonts
modified_time: 2018-09-03T10:00:00.000+01:00
cloudinary_src: posts/2018-09-03-building-a-simple-company-website-the-hard-way-typography__2_se31j8
---

Let’s face it: web is bloated with bad typography. Words like vertical
rythm, careful font selection and readability didn’t really make it to the web,
it seems. Good news is, that it can be achieved and in this post, I will show
you how to approach it.

{% include figure.html cloudinary_src='posts/2018-09-03-building-a-simple-company-website-the-hard-way-typography__2_se31j8' sizing='wide' caption='Author: <a href="https://www.flickr.com/photos/tarale/2897185492" rel="noopener" target="_blank">Taryn</a>; CC BY 2.0' %}

*Note: this article is the first in our 2018 series Building a simple company
website the Hard Way where you can read some interesting points on contemporary
website design.*

A good typography definitely makes a difference. If you’re not familiar with the
term, it describes the means how to make a written language *readable* and
*appealing*. Having good typography on your website increases the chance that people read
what you want to tell them. Having a bad typography can result in people leaving
your page immediately because they’re simply disgusted or disoriented.

Mastering typography is like mastering painting: it’s an artistic discipline of sorts. It
takes years of practice to do it really well. But that doesn’t mean you can’t do
anything about it for the time being. You can and the results will definitely be worth
your effort. Let’s dive into it.

## Start with your content first

It all starts right on your keyboard. Everything else will be useless
unless your text is written well. It’s a broad topic and this little article
can’t fully cover it. Good news it doesn’t need to because others already have.
I recommend going through the excellent [Butterick’s Practical Typography][5]
e-book. Well worth your time.

## Font selection

Selecting a bad font can easily ruin all the hard work you put into writing your
valuable content. Internet is flooded with [Google Fonts][1] nowadays. It's
free, it’s packed with options and everyone loves it. Unfortunately, the good old
rule still applies here: *you get what you pay for*.

Don’t get me wrong: I’m not saying that all the Google Fonts are *bad*. There
certainly are exceptions like [Roboto][2] or [Source Code Pro][3]. The
problem is that number of well-made Google Fonts is relatively low. Which leads to the fact
that the good ones are way too overused on the web. Ultimately, it’t
the opposite of broad selection&mdash;you’re using fonts that are used by
millions of websites, leaving behind your chance to stand out of crowd.

Fortunately, using Google Fonts is not the only way. There are many great font
designers out there. Be ready to pay for it though as creating a quality font is
no easy job; it takes hundereds of hours of work to do it well. And that’s why
it’s worth the investment because professional font will have all the important
font design aspects (like real *italics* or *kerning*) made exactly right.

For example, for our 2018 company website, we’ve chosen the fonts from Czech-based typeset
foundry [Storm Type][4]. Specifically, we’ve decided to use [Andulka Text
Pro](https://www.stormtype.com/typefaces/841) for the body typeface and [Trivia
Grotesk N2](https://www.stormtype.com/typefaces/2239) for the headings.

There are no strict rules on how to choose your fonts. It's all
matter of personal taste and trial. But I will provide you with some general
advices that can give you a little headstart:

* Try various combinations and see what *works well together*.
* Avoid selecting multiple *similar fonts*. Use your font selection to help you
  readers to easily differentiate various contexts.
* Think of what your *website message* is. Is it modern? Is it fancy? Is it
  serious? Your typeface selection might want to reflect that.
* Avoid [goofy fonts](https://practicaltypography.com/goofy-fonts.html) by all
  means. No exceptions there really.
* Use *low number of typefaces*. In most cases, two shall
  suffice (body + headings). When adding a new font, always ask yourself: is that really
  necessary?  Remember that there are various means of adding emphasis to your
  text. Different fonts should be considered a last resort.

## Line length

Line length is an essential and often neglected attribute of any written text.
It's been known for centuries that text is best readable when there are *45&ndash;90
characters per line*. Interestingly, people seem to have forgotten that in the
internet age.

---

Compare this (approx. *100 characters* per line):

<figure class="figure figure--wide figure--left">
<p>On July 16, 1969, the Apollo 11 spacecraft launched from the Kennedy Space
Center in Florida. Its mission was to go where no human being had gone
before—the moon! The crew consisted of Neil Armstrong, Michael Collins,
and Buzz Aldrin.</p>
</figure>

with this (approx. *55 characters* per line):

<figure class="figure figure--left">
<p>On July 16, 1969, the Apollo 11 spacecraft launched from the Kennedy Space
Center in Florida. Its mission was to go where no human being had gone
before—the moon! The crew consisted of Neil Armstrong, Michael Collins,
and Buzz Aldrin.</p>
</figure>

---

Can you *feel the difference*? Many websites use even higher line length
which can easily render the whole text unreadable (note: if you’re on mobile,
it’s gonna look the same; see it on desktop instead).

When deciding whether the number of characters is OK, you can also use the
*alphabet test*. As a general rule of thumb, you should be able to fit between
2&ndash;3 full alphabets on one line.

---

<figure class="figure figure--wide figure--left">
<p>abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu</p>
</figure>

&hellip; yields **~3.8 alphabets**. That is too much.


<figure class="figure figure--left">
<p>abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd</p>
</figure>

&hellip; yields **~2.2 alphabets**, which is OK.

---

## Hyphens

What are *hyphens*? We all know them, they look like this: -. They have multiple
uses but a common one is to put it at the end of line when a work breaks onto
the next line. These little marks improve legibility of the written text by adding more
consistency in length of individual lines.

This has been automated for decades in text processors. It's not known
that well that it can be also used *on the web* as you can easily see at this page.

Use following CSS rule to turn it on:

```css
.hyphenate {
    -webkit-hyphens: auto;
        -ms-hyphens: auto;
            hyphens: auto;
}
```

Hyphenation support is language-sensitive. Therefore, it is essential to
set the right language for the given DOM node. E.g.:

```html
<article class="hyphenate" lang="en">...</article>
```

If you don’t set it specifically for the given node, it will inherit the `lang` attribute
value from it’s ancestors. This means you should specify it at at least on the `<html>`
tag level (which is always a good idea).

Note: hyphenation support will vary for different languages (and with [different
browsers](caniuse.com/#search=hyphens) for that matter). It’s not perfect, but
from our experience, it works quite well for both English and Czech languages.
If you’re not satisfied with the browser hypehenation quality for your language,
you can help the browser by using the *soft hypen* HTML entity (`&shy;`) to give
it an advice where it's OK to break the word. This easily gets tedious though so
you might want to use some tool to automate the prcoess, like the
[hypher](https://github.com/bramstein/hypher) JS library.

## Kerning, ligatures

These are font features that&mdash;similarly to hyphenation&mdash;have been
used in typesetting programs since the beginning.

*Kerning* is a name for spacing adjustments made to specific letter pairs. Taking and
example from [Practical Typography](5) e-book, look at these two lines of text:

---

Kerning disabled:

<p class="alpha" style="font-kerning: none; -webkit-font-feature-settings: unset; font-feature-settings: unset;">
AY, Ty, Va, TAT
</p>

Kerning enabled:

<p class="alpha" style="font-kerning: auto; -webkit-font-feature-settings: unset; font-feature-settings: unset;">
AY, Ty, Va, TAT
</p>

---

Kerning adjusts spacing between letter pairs in a way that makes reading it easier.
Default kerning setting in HTML is *on*. But that will only happen if you have a
font that has the kerning letter pairs defined. As mentioned previously, you can
rely that professional fonts do.

*Ligatures* come from the days of metal font typesetting to avoid a problem, when
some characters tended to collide in a unpleasant way. These collisions can
happen with 'f' character for example. Consider this:

---
Without ligatures:

<p class="alpha" style="font-variant-ligatures: none; -webkit-font-feature-settings: unset; font-feature-settings: unset;">
<span>fi fj</span> <i>fi fj</i>
</p>

With ligatures:

<p class="alpha" style="font-variant-ligatures: normal; -webkit-font-feature-settings: 'liga'; font-feature-settings: 'liga';">
<span>fi fj</span> <i>fi fj</i>
</p>
---

It’s worth noting that ligature support is not necessary for all fonts. Some are
simply designed in a way that prevents characters from colliding. In the example
above, the need for ligatures is questionable. But the variant with ligatures
enabled definitely looks more appealing.

As with kerning, this will only work if your font is quality one and have the
ligatures defined.

## Conclusion

We’ve covered some basics on typography. We've learned that typography can help
you boost interest in your content and (hopefully) bring some new audience. We’ve also
learned how bad typography can yield the opposite outcome. I hope that this
little introduction made you *aware* that while web is substantially different
from print, we still should care about readability and aesthetics of written
language. Bad typography cannot be saved by nice color selection, photos and icons.

If you liked the article, stay tuned for the next part of our *Building a simple
company website the Hard Way* series where we’re gonna talk about another
important aspect of typography: *vertical rythm*.


[1]: https://fonts.google.com/
[2]: https://fonts.google.com/specimen/Roboto
[3]: https://fonts.google.com/specimen/Source+Code+Pro
[4]: https://www.stormtype.com/
[5]: https://practicaltypography.com/
