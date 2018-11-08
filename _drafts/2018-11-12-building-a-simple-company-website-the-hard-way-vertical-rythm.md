---
layout: post
title: 'Building a simple company website the Hard Way: Vertical rythm'
date: 2018-11-12T14:00:00.000+01:00
author: Filip Vařecha
lang: en
tags:
- typography
- vertical rythm
- baseline
- sass
- css
- fonts
modified_time: 2018-09-03T14:00:00.000+01:00
cloudinary_src: posts/2018-09-03-building-a-simple-company-website-the-hard-way-typography__2_se31j8
---

Websites with good vertical rythm are more aesthetically pleasing and generally feel
more consistent. While understanding of vertical rythm rules is simple, maintaing
it on bigger websites might get challenging. And challenges are fun, aren't they? Read on!

## Vertical rythm?

Let’s start with a little bit of theory first. What exactly is *vertical rythm*?
It’s a magical combination of two compounds of written text:

* a line-height
* margins and paddings

By mixing up these properties, you can either end up with a page that looks
chaotic or&mdash;when following the vertical rythm rules&mdash;with website that feels
natural and pleasing.

To get a grasp of the principle, consider these two designs:

{% include figure.html cloudinary_src='posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__1_yjlap0' caption='The good, the bad and the ugly' sizing='wide' %}

Even without the baseline grid attached, you would probably say that the one on the
left just feels right: it’s easier to read, it’s more balanced and it generally looks
more professional. While the one on the right feels rather awkward. Good rythm inherently
brings feel of natural flow and&mdash;similarily to how music rythm works&mdash;improves
readability and the looks of the text. Even if you are not a musician, you would probably
notice when the rythm is erratic. The same applies to the written text. This principle
relates to how our brains works, the key word here is [pattern recognition](https://en.wikipedia.org/wiki/Pattern_recognition_(psychology)).

When there is a pattern (think rythm), the brain has less work to decode the message. When the pattern
is lacking, text is more difficult (and exhausing) to read. And from the previous series
part, we know [this is dangerous](/blog/2018/09/03/building-a-simple-company-website-the-hard-way-typography-intro/).

Good. Now we know rythm is imporant. The big question is: *how do we maintain it*?
Surprisingly, there are only two basic rules: *multiples of line-height* and *consistency*.

### Multiples of line-height

The core principle behind good vertical rythm is quite simple: choose appropriate
line height and use it as the grid unit. Keep all the spacings between elements
on the page as **multiples of it**.

A common practice is to *set the line height to 120&ndash;150% of the font size*. This
means it all starts with the font size. Many people choose **16px** as base,
because browsers use this as the default value, but you are free to choose
whatever you like. We chose **18px** for this site. Once you have your base font
size chosen, decide about the line height. Most of the time, 150% of font size
works well and we did the same on this size. Line height is set to **27px**
(18px&nbsp;&times;&nbsp;1.5).

Then, when designing the site, keep in mind following simple rule:

> Element spacing shall be kept as multiples of your line height.

For example, if your line height is 24px, you would set your spacings to
48px, 72px, 96px and so on. You could also use 12px as its 24px&nbsp;&times;&nbsp;0.5.
All the multiples are OK as long as you don’t create dozens of combinations
and keep things simple and *consistent*.

### Consistency

Consistency is important beacuse it simplifies orientation and greatly contributes
to a natural rythmic feel of the text. Having the spacings properly sized but inconsistent
would not make the reading any simpler for the reader.

Thus, a good practice is to think *semantically*. Allow bigger space when the
reader should realize context changed. Use smaller space when just dividing paragraphs.
Let the text speak for itself.

## Challenges ahead

As you can probably imagine, the math can quicky get tedious when your website
grows. I definitely recommend using a CSS preprocessor such as SASS and defining
your grid size globally. This then allows you to write the grid unit either
as a *variable*:

```sass
$base-font-size: 16px; /* ~1rem */
$grid-unit: $base-font-size * 1.5; /* ~1.5rem */

/* a rule */
h1 {
    margin-bottom: 2*$grid-unit;
}
```

or as a *function*:

```sass
$base-font-size: 16px;

@function gu($multiplier: 1) {
    @return $base-font-size * $multiplier * 1.5;
}

/* a rule */
h1 {
    margin-bottom: gu(2);
}
```

### The baseline problem

A *baseline* is the invisible line on which most letters sit. Following figure demonstrates it
quite well:

{% include figure.html cloudinary_src='posts/2018-09-03-building-a-simple-company-website-the-hard-way-typography__4_jal5ik' sizing='wide' caption='Baseline, line-height, font-size and cap height explained, author: <a href="https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b">Razvan Onofrei</a>' %}

The space between individual baselines then forms the baseline grid and we know
this distance is our grid unit, the size of the line height. Go on and toggle
the baseline grid on by clicking <a href="#" onclick="window.toggleGrid();
return false;">here</a>.

When working on you vertical rythm rules, you will quickly find out that
achieving the looks of the introductory image (where each text line is nicely
put on the baseline) is not as simple as merely expressing your margins as
multiples of line-height.

The reason is is that web browsers *in fact do not know the concept of baseline*.
Instead, text is put approximately in the middle of the line height (see the
image above again for the reference).

This gets problematic when you want to use your baseline to element arrangment. Often,
you want to arrange your boxes to match the baseline. This is especially true for
multi&ndash;column content.

So, we need to deal with this somehow. For long, people thought baseline
alignment is not possible in CSS. It turns out that&mdash;with some SASS dark
magic&mdash; it’s doable. In order to acheive the desired effect, we need to
*shift every text* by a specific amount it needs to fit nicely on the baseline.
Your initial thought might be:

> Subtract font-size from line-height, divide that by two and shift the text
> down by that difference.

Kinda, but not quite. It turns out that what you really need to deal with is not
the *font-size*, but the *cap height* of each font. Unfortunately, it’s not
straightforward to get the cap height value. If you’re lucky enough, you
can google it. If not, you will need to try and guess until you see it fits.

Assuming you have `$line-height` integer (multiple of `$grid-unit`),
`$cap-height` as ratio of line height and `$font-size` in px,
you can use following formula to get the necessary shift in px:

```
shift = $font-size * ($line-height - $cap-height) / 2
```

Make sure to use the above image for the reference on the formula.

Once we have the shift, we need to move our text downwards on the baseline. We
can do that easily by adding `padding-top`. Unfortunately, this has a side-effect:
it pushes the elements following our own too. In order to compensate, we
need to set the the same value multiplied by -1 as our `margin-bottom`.

If you’re interested in details of the algorithm, please look at the [blog
post](https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b)
from the original inventor of the technique, Razvan Onofrei.

It’s clear that this would be nearly impossible to achive in pure CSS. You will need
to use a preprocessor like SASS. And create some mixins that will do the heavy lifting.
Or, there are frameworks too. You can use [sassline](https://sassline.com/) from the
Razvan Onofrei or [plumber](https://jamonserrano.github.io/plumber-sass/) that implements
this as a nice SASS library.

We originally tried Sassline first but quickly realized it’s too strict and we
didn’t really like all the rules it introduced. So we’ve decided to write our
bunch of mixins that get the job done.

Take a look at the following example (a stripped down version of one of our mixins):

```sass
$grid-unit: 1.5rem;

@function gu($multiplier: 1) {
    @return $grid-unit * $multiplier;
}

@mixin baseline-in-breakpoint($font, $size, $lineheight) {
    $cap-height: map-get($font, cap-height);
    $shift:

    font-family: #{map-get($font, font-family)};
    font-size: #{$size / $rootsize}rem;
    padding-top: #{$shift}rem;
    margin-bottom: #{$shift * -1}rem;
    line-height: gu($lineheight);
}
```

### The restrictive line-height problem

This is best demonstrated by an example:

{% include figure.html cloudinary_src='posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__2_hri4a5' sizing='wide' caption='Line-height in direct multiples of grid unit is too restrictive sometimes. In this case on headings.' %}

As you can see on the image, headings on these two examples have different line-height.
The example on the left&mdash;albeit breaking the baseline grid&mdash;looks better
(and reads better too!). Yes, I've been lying to you:

> Breaking the grid is OK and generally recommended if the readability would
> suffer otherwise.

This rule has a sibling:

> When you break the baseline grid, make sure to join it again as soon as possible.

As you can clearly see on the example, the grid pace is restored once we’ve dealt with
the heading. Even though rules are simple, implmentation is not. I’ve been thinking about
it for some time and I’m pretty sure it’s impossible to solve with some JavaScript behind
the scenes.

The reason for that is that in pure CSS, you never know how many lines the heading will
span. You simply need to calculate the margin compensation based on the actual size
of the block element which cannot be predicted in the CSS.

For that reason, we’ve created quite simple JS function that will calculate the margin compensation for us:

```javascript
// How many rem units is our line-height.
const GRID_REMS = 1.5;
// Rem size in pixels.
const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
// Size of grid unit in pixels.
const gridUnitSize = remSize * GRID_REMS;

function fixBaseline(element) {
    const elemStyle = element.currentStyle || getComputedStyle(element);
    const elemBoundingHeight = element.getBoundingClientRect().height;
    const elemBottomMargin = elemStyle.marginBottom ? parseFloat(elemStyle.marginBottom) : 0;

    const elemHeight = elemBoundingHeight + elemBottomMargin;
    const elemHeightInGu = elemHeight / gridUnitSize;
    const marginBottomInGu = elemBottomMargin / gridUnitSize;

    const heightDecimalPart = elemHeightInGu % 1;
    const newMarginInGu = heightDecimalPart > 0.5 ?
        1 - heightDecimalPart + marginBottomInGu :
        marginBottomInGu - heightDecimalPart;

    element.style.marginBottom = (newMarginInGu * GRID_REMS) + 'rem';
}
```


## Conclusion

Good typography comes at a price. Professional fonts will cost you something. Fitting
your content to baseline also takes a bit of your precious time. But the results are certainly worth
it. It makes reading your content pleasant which in turn makes people reading
it less likely to quit.

More importantly, it makes your website to stand out beacuse&mdash;as mentioned
previously&mdash;most websites doesn’t give a damn.


If you’re interested in more tech tips, stay tuned for the next part of our
*Building a simple company website the Hard Way* series.
