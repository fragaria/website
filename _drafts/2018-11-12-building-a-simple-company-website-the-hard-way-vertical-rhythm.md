---
layout: post
title: 'Building a simple company website the Hard Way: Vertical rhythm'
date: 2018-11-12T14:00:00.000+01:00
author: Filip Vařecha
lang: en
tags:
- typography
- vertical rhythm
- baseline
- sass
- css
- fonts
modified_time: 2018-09-03T14:00:00.000+01:00
cloudinary_src: posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__6_msthpg
---

Websites with good vertical rhythm are more aesthetically pleasing and generally feel
more consistent. While understanding vertical rhythm rules is simple, maintaing
it on bigger websites becomes challenging. But challenges are fun, aren't they? Read on!

{% include figure.html cloudinary_src='posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__6_msthpg' sizing='wide' %}

<section class="box">
<p>This article is a part of the <i>Building a simple company website the Hard Way</i> series.</p>

<ol>
    <li><a href="/blog/2018/09/03/building-a-simple-company-website-the-hard-way-typography-intro/">Typography introduction</a></li>
    <li>Vertical rhythm</li>
</ol>
</section>

## Vertical rhythm?

Let’s start with a little bit of theory first. What exactly is *vertical rhythm*?
Simply said, it describes combination of two properties of written text:

* a line height
* element spacings (think margins and paddings)

By mixing up these properties you can either end up with a page that looks
chaotic or&mdash;when you’re careful&mdash;with website that feels
natural and pleasing. To get a grasp of the principle, consider these two designs:

{% include figure.html cloudinary_src='posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__1_yjlap0' caption='The Good, the Bad and the Ugly.' sizing='wide' %}

Even without the baseline grid attached you would probably say that the one on the
left just feels right: it’s easier to read, more balanced and it generally looks
more professional. While the one on the right feels rather awkward. Good rhythm inherently
brings this feel of natural flow and&mdash;similarly to how music rhythm works&mdash;improves
readability and the looks of the text. Even if you are not a musician, you would probably
notice when the rhythm is erratic. The same applies to written text. This principle
relates to how our brains work, the key word here is [pattern recognition](https://en.wikipedia.org/wiki/Pattern_recognition_(psychology)).

{% include figure.html cloudinary_src='posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__3_ex0yyd' caption='Vertical rhythm is somewhat similar to rhythm in music.' %}

When there is a pattern (*~rhythm*), the brain has less work to decode the message. When the pattern
lacks, text is more difficult (and exhausing) to read. And from the [previous series
part][1] we know this is *dangerous*.

Good. Now we know rhythm is imporant. The big question is: *how do we maintain it*?
Surprisingly, there are only two basic rules: *multiples of line height* and *consistency*.

### Multiples of line height

The core principle behind good vertical rhythm is quite simple: choose appropriate
line height and use it as the grid unit. Keep all the spacings between elements
on the page as *multiples of it*.

A common practice is to *set the line height to 120&ndash;150% of the font size*. This
means it all starts with the font size selection. Many people choose *16px as base*,
because browsers use this as the default value, but you are free to choose
whatever you like. We chose 18px for this site. Once you’ve decided about the base
font size, decide about the line height. Most of the time, 150% of font size
works well and we did the same on this site. Line height is set to 27px
(18px&nbsp;&times;&nbsp;1.5).

Then, when designing the site, keep in mind this simple rule:

> Element spacing shall be kept as multiples of your line height.

For example, if your line height is 24px, you would set your spacings to
48px (2&nbsp;&times;&nbsp;24), 72px (3&nbsp;&times;&nbsp;24), 96px
(4&nbsp;&times;&nbsp;25) and so on. You could also use 12px as it’s
0.5&nbsp;&times;&nbsp;24. All the multiples are OK as long as you
don’t create dozens of combinations and keep things simple and *consistent*.

### Consistency

Consistency is important beacuse it simplifies orientation and greatly contributes
to a natural rhythmic feel of the text. Having the spacings properly sized but inconsistent
would not make the reading any simpler for the reader. Taking inspiration from the
music again, most songs have verses that repeat throughout the song in consistent matter.

Keeping things consistent means estabilishing some rules upfront. This is up to you, there
are no strict rules. A good way to do it is to think *semantically* about the elements.
Allow bigger space when the reader should realize context changed. Use smaller
space when just dividing paragraphs. Let the text speak for itself.

## Challenges on the horizon

As you can probably imagine, the math can quicky get tedious when your website
grows. I definitely recommend using a CSS preprocessor such as
[SASS](https://sass-lang.com/) and defining your grid size globally. This then
allows you to write the grid unit either as a *variable*:

```scss
$base-font-size: 16px; /* ~1rem */
$grid-unit: $base-font-size * 1.5; /* ~1.5rem */

/* a rule */
h1 {
    margin-bottom: 2 * $grid-unit;
}
```

or as a *function*:

```scss
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

A *baseline* is the invisible line on which most letters sit. The following figure demonstrates it
quite well:

{% include figure.html cloudinary_src='posts/2018-09-03-building-a-simple-company-website-the-hard-way-typography__4_jal5ik' sizing='wide' caption='Baseline, line-height, font-size and cap height explained, author: <a href="https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b">Razvan Onofrei</a>' %}

The space between individual baselines then forms the baseline grid and we know
this distance is our grid unit, the size of our line height. Go on and toggle
the baseline grid on this website by clicking <a href="#" onclick="window.toggleGrid();
return false;">here</a>. See how all the lines sit nicely on it?

When working on you vertical rhythm rules, you will quickly find out that
achieving the looks of the introductory image (where each text line is nicely
put on the baseline) is not as simple as merely expressing your spacings as
multiples of line height.

The reason for that is that web browsers *in fact do not recognize the concept of baseline*.
Instead, text is put approximately in the middle of the line height (see the
image above again for the reference).

This gets problematic when you want to use your baseline for element arrangment. Often,
you want to arrange your boxes to match the baseline. This is especially true for
multi&ndash;column content.

So, we need to deal with this somehow. For long, people thought baseline
alignment was not possible in CSS. It turns out that&mdash;with some SASS dark
magic&mdash;it’s doable. In order to acheive the desired effect we need to
*shift every text* downwards by a specific amount it needs to fit nicely on the baseline.
Your initial thought might be:

> Subtract font-size from line-height, divide that by two and shift the text
> down by that difference.

Kinda, but not quite. It turns out that what you really need to deal with is not
the *font-size*, but the *cap height* of each font. Unfortunately, it’s not
straightforward to get the cap height value. If you’re lucky enough, you
can google it. If not, you will need to either measure it or try and guess
until you see it fits.

Assuming you have `$line-height` and `$font-size` in pixels and `$cap-height`
as ratio of font size (e.g. 0.79 means 79% of the font size is
the actual cap height), following formula can be used:

```scss
$shift: ($line-height - ($font-size * $cap-height)) / 2;
```

Make sure to use the above image for the reference on the formula.

Once we have the shift, we need to move our text downwards on the baseline. We
can do that easily by adding `padding-top`. Unfortunately, this has a side-effect:
it pushes the elements below the one in question, too. In order to compensate, we
need to set the same value multiplied by &ndash;1 as our `margin-bottom`.

If you’re interested in details of the algorithm, please look at the [blog
post](https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b)
from the original inventor of the technique, Razvan Onofrei.

In order to use this globally, we’re need some help with the math. This is where
SASS enters the game. Let’s create some mixins for it. Take a look at the following
example (a stripped down version of one of our mixins):

```scss
// Base font size, equals to 1rem.
$rootsize: 16px;
// One grid unit.
$grid-unit: 1.5rem; // ~ 24px
// Information about the font.
$font: (
    cap-height: 0.75,
    font-family: "'Andulka Text Pro', Georgia, Palatino, serif"
);

@function gu($multiplier: 1) {
    @return $grid-unit * $multiplier;
}

// Assumes $size and $lineheight are passed in pixels.
@mixin baseline($size, $lineheight) {
    $size-rems: strip-unit($size / $rootsize);
    $capheight-rems: $size-rems * map-get($font, cap-height);
    $lh-rems: strip-unit($lineheight / $rootsize);
    $shift: ($lh-rems - $capheight-rems) / 2;

    font-family: #{map-get($font, font-family)};
    font-size: #{$size-rems}rem;
    padding-top: #{$shift}rem;
    margin-bottom: #{$shift * -1}rem;
    line-height: #{$lh-rems}rem;
}
```

There are frameworks, too. You can use [sassline](https://sassline.com/) from the
Razvan Onofrei (original author of the idea) or
[plumber](https://jamonserrano.github.io/plumber-sass/) that implements this as
a nice SASS library.

We originally tried Sassline but quickly realized it’s too restrictive and we
didn’t really like all the rules it had introduced. So we decided to write our
bunch of mixins to get the job done.

### The restrictive line-height problem

This is best demonstrated by an example:

{% include figure.html cloudinary_src='posts/2018-11-12-building-a-simple-company-website-the-hard-way-vertical-rythm__2_hri4a5' sizing='wide' caption='Line-height in direct multiples of grid unit is too restrictive sometimes. In this case on headings.' %}

As you can see on the image, headings on these two examples have different line height.
The example on the left&mdash;albeit breaking the baseline grid&mdash;looks better
(and reads better, too!). Well, I've not been totally honest with you:

> Breaking the grid is OK and generally recommended if the readability should
> suffer otherwise.

This rule has a sibling:

> When you break the baseline grid, make sure to join it again as soon as possible.

Example image shows this well. The grid pace is restored once the heading has
been dealt with.

Even though rules are simple, implmentation is not. The reason for that
is that the margin compensation depends on *how many lines the heading spans*. Looking
at the picture it’s obvious that the margin compensation will be different
if the heading takes one line, two lines and so on. When we’re off the grid, we’re
simply off.

Therefore, some static SASS code won’t suffice. We’ll have to use something with
more dynamic nature: JavaScript. We ought to calculate the margin compensation based
on the actual height of the block element. Ultimately, we need to round the total element height
to *nearest grid unit*.

See the example code:


```javascript
// How many rem units is our line-height.
const guRems = 1.5;
// How many pixels is 1rem.
const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
// Size of 1 grid unit in pixels.
const gridUnitSize = remSize * guRems;

function fixBaseline(element) {
    const elemStyle = element.currentStyle || getComputedStyle(element);
    // Actual element height *without* the margin.
    const elemBoundingHeight = element.getBoundingClientRect().height;
    // Current margin of the element in px.
    const elemBottomMargin = elemStyle.marginBottom ? parseFloat(elemStyle.marginBottom) : 0;
    // Total height of the element in px.
    const elemHeight = elemBoundingHeight + elemBottomMargin;

    const elemHeightInGu = elemHeight / gridUnitSize;
    const marginBottomInGu = elemBottomMargin / gridUnitSize;

    // Height difference to nearest grid unit.
    const heightDecimalPartInGu = elemHeightInGu % 1;
    // Compensated margin.
    const newMarginInGu = heightDecimalPartInGu > 0.5 ?
        1 - heightDecimalPartInGu + marginBottomInGu :
        marginBottomInGu - heightDecimalPartInGu;

    // Set the new margin (keep rems).
    element.style.marginBottom = (newMarginInGu * guRems) + 'rem';
}
```

It’s quite straightforward. When dealing with the difference to the nearest
grid unit, we either round up or down depending on what is closer. You might
end up favoring one or the other. This can be easily adjusted by changing
the `0.5` to something else (in 0&ndash;1 range).

Applying this function to our elements (ones that are set to have
line height other than integer multiple of grid unit) then
turns out to be easy:

```javascript
var query = 'h1, h2, h3, .something-else-that-needs-fixing';

var forEachNode = function (nodelist, callback) {
    for (var i = 0; i < nodelist.length; i++) {
        callback.call(callback, nodelist[i]);
    }
};

forEachNode(document.querySelectorAll(query), fixBaseline);
```

## Conclusion

We’ve covered some ideas on vertical rhythm. As we’ve found out,
browser rendering engines unfortunately lack support for proper
typography. We’ve described few tips on how to work around
it ourselves. Let’s hope the rendering engines will improve at some point
in future. Until then, we have two options:

1. Ignore the baseline troubles and focus just on the basics
2. Put significant effort to make your website stand out

Since you’ve read all the way down to conclusion, I bet you might like the option two a bit more.

And in case you enjoyed the article, stay tuned for the next part of *Building a simple
company website the Hard Way* series. We’ll shed some light on Web Workers.

[1]: /blog/2018/09/03/building-a-simple-company-website-the-hard-way-typography-intro/
