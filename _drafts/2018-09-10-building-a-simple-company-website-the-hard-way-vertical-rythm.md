---
layout: post
title: 'Building a simple company website the Hard Way: Vertical rythm and baseline'
date: 2018-09-03T14:00:00.000+01:00
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

## Addiction to baseline

A *baseline* is a line on which most letters sit. Following figure demonstrates it
quite well:

{% include figure.html cloudinary_src='posts/2018-09-03-building-a-simple-company-website-the-hard-way-typography__4_jal5ik' sizing='wide' caption='Baseline, line-height, font-size and cap height explained, author: <a href="https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b">Razvan Onofrei</a>' %}

Why am I mentioning the addiction? Because on most websites, the designers do not
care much if the *vertical rythm* takes the baseline grid into consideration.
Worse, most website do not care about vertical rythm at all. When designing our new
company website, we decided to be very strict about that. Fitting everything to baseline
became a must, addiction of sort.

You might ask why this is important? Well, besides making spacing adjustments way
simpler (think 1rem = 1 grid column), it shines when you deal with multi-column
content. It makes it neatly aligned with a newspaper-like feel.

Go on and toggle the grid on by clicking <a href="#" onclick="window.toggleGrid();
return false;">here</a>.

As you can see, everything (well, almost) sits nicely on the grid
line. Suprisingly, aligning text to a baseline in pure CSS is a tricky stuff. Given how
*line-height* works (refer to above image again), text will always be aligned to
it's middle and not to the baseline as we would like it to.

In order to acheive the desired effect, we need to *shift every text* by a specific
amount it needs to fit nicely on the baseline. Your initial thought might be:

> Subtract font-size from line-height, divide that by two and shift the text
> down by that difference.

Kinda, but not quite. It turns out that what you really need to deal with is not
the *font-size*, but the *cap height* of each font. Unfortunately, it's not
straightforward to get the cap height value. If you're lucky enough, you
can google it. If not, you will need to try and guess until you see it fits.

So, the general rule will be:

```
shift = font-size * (line-height - cap-height) / 2
```

We use that shift to calculate `padding-top` and corresponding `margin-bottom`
adjustments that will trigger the baseline alignment. Why both padding *and*
margin? Because if we only used padding, it would affect all the other elements.

If you're interested in details of the algorithm, please look at the [blog
post](https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b)
from the original inventor of the technique, Razvan Onofrei.

It's clear that this would be nearly impossible to achive in pure CSS. You will need
to use a preprocessor like SASS. And create some mixins that will do the heavy lifting.

To simplify things, you can use [sassline](https://sassline.com/) or
[plumber](https://jamonserrano.github.io/plumber-sass/) that implement
this as a nice SASS library.

We originally tried Sassline first but quickly realized it’s too strict and we
didn’t really like all the rules it introduced. So we’ve decided to write our
bunch of mixins that get the job done.

Take a look at the following example (a stripped down version of one of our mixins):

```sass
@mixin baseline-in-breakpoint($breakpoint, $fontsize, $font, $lineheight, $above, $below) {
    @if not map-has-key($breakpoints, $breakpoint) {
        @warn "Unknown breakpoint class: #{$breakpoint}"
    }

    // Get cap height of given font
    $cap-height: map-get($font, cap-height);
    // We're using a modular scale that allows us to se different font sizes for every breakpoint.
    $scale: map-get($modular-scale, $breakpoint);
    $size: map-get($scale, $fontsize);

    // This is the root size (1rem) of font
    $rootsize: map-get($rootsizes, $breakpoint);

    $baseline-shift: $above + (($size / 2 * (($lineheight * $rootsize / $size) - $cap-height)) / $rootsize + 0.00001);
    $baseline-push: #{$below - (($size / 2 * (($lineheight * $rootsize / $size) - $cap-height)) / $rootsize + 0.00001)};

    font-family: #{map-get($font, font-family)};
    font-size: #{$size / $rootsize}rem;
    padding-top: #{$baseline-shift}rem;
    margin-bottom: #{$baseline-push}rem;
    line-height: #{$lineheight}rem;
}
```


## Conclusion

Good typography comes at a price. Professional fonts will cost you something. Fitting
your content to baseline also takes a bit of your precious time. But the results are certainly worth
it. It makes reading your content pleasant which in turn makes people reading
it less likely to quit.

More importantly, it makes your website to stand out beacuse&mdash;as mentioned
previously&mdash;most websites doesn't give a damn.


If you’re interested in more tech tips, stay tuned for the next part of our
*Building a simple company website the Hard Way* series.
