<script module lang="ts">
  import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
  import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
  import { Hint, type IHint } from "$lib/components/hint/Hint.svelte";
  import { Fieldset, type IFieldset } from "$lib/components/fieldset/Fieldset.svelte";
  import { Input } from "$lib/components/input/Input.svelte";
  import { ErrorMessage, type IErrorMessage } from "$lib/components/error-message/ErrorMessage.svelte";
  interface IItem extends IHtmlOrText {

  }

  interface IFormGroup {
    beforeInputs?: string;
    afterInputs?: string;
  }
  interface IDateInput extends  IHtmlOrText {
    classes?: IClass;
    attributes?: IAttributes;
    hint?: IHint;
    fieldset?: IFieldset;
    formGroup?: IFormGroup;
    errorMessage?: IErrorMessage;
    namePrefix?: string;
    items?: IItem[]
  }
</script>
<script lang="ts">
  let {
    id,
    classes,
    attributes,
    hint,
    fieldset,
    formGroup,
    errorMessage,
    namePrefix,
    items
 }: IDateInput = $props();
</script>

<!-- a record of other elements that we need to associate with the input using
  aria-describedby – for example hints or error messages -->
{@const describedBy = fieldset.describedBy || "" }

<!-- fieldset is false by default -->
{@const hasFieldset = !!fieldset}

{#if items?.length }
{@const dateInputItems = items }
{:else }
{@const dateInputItems = [
    {
        name: "day",
        classes: "govuk-input--width-2"
    },
    {
        name: "month",
        classes: "govuk-input--width-2"
    },
    {
        name: "year",
        classes: "govuk-input--width-4"
    }
  ] }
{/if}

<!-- Capture the HTML so we can optionally nest it in a fieldset -->
{#snippet innerHtml() }
{#if hint}
{@const hintId = id + "-hint" }
{@const describedBy = describedBy ? describedBy + " " + hintId : hintId }
<Hint
    id={hintId} classes={hint.classes}
               attributes={hint.attributes}
               html={hint.html}
               text={hint.text}/>
{/if}
{#if errorMessage }
{@const errorId = id + "-error" }
{@const describedBy = describedBy ? describedBy + " " + errorId : errorId }
<ErrorMessage id={errorId} classes={errorMessage.classes}
                       attributes={errorMessage.attributes}
                       html={errorMessage.html}
                       text={errorMessage.text}
                       visuallyHiddenText={errorMessage.visuallyHiddenText}
                     />
{/if}
<div class={["govuk-date-input", classes]}
     {...govukAttributes(attributes) }
     {id}>
    {#if formGroup.beforeInputs }
        {@render htmlOrText(formGroup.beforeInputs,4)}
    {/if}
    {#each dateInputItems as item}
    <div class="govuk-date-input__item">
        <Input label={
            {
                text: item.label ?? item.name | capitalize,
                classes: "govuk-date-input__label"
            }}
          id={item.id ?? (id + "-" + item.name)}
          classes={[ "govuk-date-input__input ", item.classes]}
          name={ namePrefix ? namePrefix + "-" + item.name : item.name}
          value={ item.value}
          type="text"
          inputmode={item.inputmode ?? "numeric"}
          autocomplete={ item.autocomplete}
          pattern= {item.pattern}
          attribute={item.attributes}
        />
    </div>
    {/each}
    {#if formGroup.afterInputs }
    {@render htmlOrText(formGroup.afterInputs,4)}
    {/if}
</div>
{/snippet}

<div class={["govuk-form-group", errorMessage && "govuk-form-group--error", formGroup.classes] }
     {...govukAttributes(formGroup.attributes) }>
    {#if hasFieldset}
    <!-- We override the fieldset's role to 'group' because otherwise JAWS does not
      announce the description for a fieldset comprised of text inputs, but
      adding the role to the fieldset always makes the output overly verbose for
      radio buttons or checkboxes. -->
            <Fieldset
                    {describedBy}
                    classes={fieldset.classes}
                    role="group"
                    attributes={fieldset.attributes}
                    legend={fieldset.legend}
                    html={trim(innerHtml)}
            />
            {:else}
            {@render trim(innerHtml)}
            {/if}
      </div>
