<script lang="ts">
        import { govukAttributes, type IKeyString } from "$lib/helpers/attributes.js";
    import {govukI18nAttributes } from "$lib/helpers/i18nAttributes.js";
    import {TextArea, type ITextArea} from "$lib/components/textarea/TextArea.svelte";
    import {Label, type ILabel } from "$lib/components/label/Label.svelte";
    import {Hint, type IHint } from "$lib/components/hint/Hint.svelte";

    interface ICharCount {
      id?: string,
        name?: string,
        maxwords?: number,
        maxlength?: number,
        textareaDescriptionText?: string, textareaDescriptionLength?: number,
        label: ILabel,
        formGroup: IKeyString,
        countMessage: {
            classes: string | string[]
        },
        value: number
    };

    let {
      id, name,
      maxwords, maxlength, textareaDescriptionText,textareaDescriptionLength,
      charactersUnderLimitText, charactersAtLimitText, charactersOverLimitText,
      wordsUnderLimitText, wordsAtLimitText, wordsOverLimitText,
      countMessage,
      value
    }: ICharCount = $props()
</script>

<!--
  If the limit is set in JavaScript, we won't be able to interpolate the message
  until JavaScript, so we only set a text if the `maxlength` or `maxwords` options
  were provided to the macro.
  -->
        {@const hasNoLimit = (!maxwords && !maxlength)}
        {@const textareaDescriptionLength = maxwords || maxlength}
        {@const textareaDescriptionText = textareaDescriptionText || 'You can enter up to %{count} ' + (maxwords ? 'words': 'characters') }
        {@const textareaDescriptionTextNoLimit = textareaDescriptionText | replace('%{count}', textareaDescriptionLength) if not hasNoLimit -%}
        {@const myId = id ?? name }

        {%- set countMessageHtml %}
        <Hint text={textareaDescriptionTextNoLimit} id={id + '-info'}
              classes={ 'govuk-character-count__message', countMessage.classes]}
        {#if formGroup.afterInput}
                {@render(formGroup.afterInput)}
        {/if}
        {% endset -%}

        {%- set attributesHtml %}
        {...govukAttributes({
  "data-module": "govuk-character-count",
  "data-maxlength": {
  value: maxlength,
  optional: true
},
  "data-threshold": {
  value: threshold,
  optional: true
},
  "data-maxwords": {
  value: maxwords,
  optional: true
}
}) }

        {#-
  Without maxlength or maxwords, we can't guess if the component will count words or characters.
  We can't guess a default textarea description to be interpolated in JavaScript
  once the maximum gets configured there.
  So we only add the attribute if a textarea description was explicitely provided.
  #}
        {%- if hasNoLimit and params.textareaDescriptionText %}
        {{- govukI18nAttributes({
  key: 'textarea-description',
  messages: { other: textareaDescriptionText }
}) -}}
        {% endif -%}

        {{- govukI18nAttributes({
  key: 'characters-under-limit',
  messages: charactersUnderLimitText
}) -}}

        {{- govukI18nAttributes({
  key: 'characters-at-limit',
  message: charactersAtLimitText
}) -}}

        {{- govukI18nAttributes({
  key: 'characters-over-limit',
  messages: charactersOverLimitText
}) -}}

        {{- govukI18nAttributes({
  key: 'words-under-limit',
  messages: wordsUnderLimitText
}) -}}

        {{- govukI18nAttributes({
  key: 'words-at-limit',
  message: wordsAtLimitText
}) -}}

        {{- govukI18nAttributes({
  key: 'words-over-limit',
  messages: wordsOverLimitText
}) -}}
        {% endset -%}

        {#- Append form group attributes onto attributes set above #}
        {%- for name, value in params.formGroup.attributes %}
        {% set attributesHtml = attributesHtml + " " + name | escape + '="' + value | escape + '"' %}
        {% endfor -%}

        <TextArea {id} {name} describedBy={id + '-info'} {rows} {spellcheck} {value}
                  formgroup={{
  classes: 'govuk-character-count' + (' ' + formGroup.classes if formGroup.classes),
  attributes: attributesHtml,
  beforeInput: formGroup.beforeInput,
  afterInput: {
  html: countMessageHtml
}
                  },
  classes= [ 'govuk-js-character-count', classes ]
  label= { {
  html: label.html,
  text: label.text,
  classes: label.classes,
  isPageHeading: label.isPageHeading,
  attributes: label.attributes,
  for: id
}}
  {hint},
  {errorMessage},
  {attributes}
/>
