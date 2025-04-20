<script module lang="ts">
  import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
  import {ErrorMessage, type IErrorMessage} from "$lib/components/error-message/ErrorMessage.svelte";
  import { Fieldset, type IFieldset} from  "$lib/components/fieldset/Fieldset.svelte";
import {Hint, type IHint} from "$lib/components/hint/Hint.svelte";
    import {Label, type ILabel} from "$lib/components/label/Label.svelte";

    export interface ICheckboxes {
      id?: string,
      name?: string,
      attributes?: IAttributes,
      classes?: IClass,
      idPrefix?: string,
      fieldset?: IFieldset,
      errorMessage?: IErrorMessage,
      hint?: IHint,
      items?: object[],
    }

</script>

<script lang="ts">
  let {
    id, name, classes, attributes, idPrefix, fieldset,errorMessage, hint, items
  }:ICheckboxes = $props;
</script>


<!-- If an id 'prefix' is not passed, fall back to using the name attribute
  instead. We need this for error messages and hints as well -->
{@const idPrefix = idPrefix ?? name }

<!-- a record of other elements that we need to associate with the input using
  aria-describedby – for example hints or error messages -->
{@const describedBy = describedBy ?? "" }
{#if fieldset.describedBy }
{@const describedBy = fieldset.describedBy }
{/if}

<!-- fieldset is false by default -->
{@const hasFieldset = !!fieldset}

{#snippet _checkboxItem(params, item, index)}
<!--
If the user explicitly sets an id, use this instead of the regular idPrefix
The first id should not have a number suffix so it's easy to link to from the error summary component
-->
        {@const itemId = item.id ?? idPrefix + ("-" + (index > 1 ) ? index :"") }
        {@const itemName = item.name ?? name }
        {@const conditionalId = "conditional-" + itemId }
        {#if item.divider}
  <div class="govuk-checkboxes__divider">{ item.divider }</div>
        {:else}
        {@const isChecked = item.checked ??  params.values ? (item.value in params.values && item.checked != false) :  false }
        {@const hasHint =  (item.hint.text || item.hint.html)}
        {@const itemHintId = hasHint ? itemId + "-item-hint" : "" }
        {@const itemDescribedBy = hasFieldSet ? describedBy : "" }
        {@const itemDescribedBy = trim(itemDescribedBy + " " + itemHintId) }
  <div class="govuk-checkboxes__item">
  <input class="govuk-checkboxes__input" id={ itemId } name={itemName }
          type="checkbox" value={item.value }
  checked={isChecked}
  disabled={item.disabled }
  data-aria-controls={ item.conditional.html && conditionalId }
  data-behaviour={item.behaviour}
  aria-describedby={itemDescribedBy}
  {...govukAttributes(item.attributes) }>
  <Label html={item.html} text={item.text}
        classes={[ 'govuk-checkboxes__label', item.label.classes]}
        attributes={item.label.attributes}
        aFor={ itemId}/>
  {#if hasHint}
  <Hint id={itemHintId} classes={[ 'govuk-checkboxes__hint', item.hint.classes}
    attributes={item.hint.attributes}
  html={item.hint.html}
  text={item.hint.text}
/>
  {/if}
  </div>
  {#if item.conditional.html}
  <div class={["govuk-checkboxes__conditional", !isChecked && "govuk-checkboxes__conditional--hidden"]}
  id={ conditionalId }>
  {trim(item.conditional.html)}
  </div>
  {/if}
  {/if}
  {/snippet}

  <!-- Capture the HTML so we can optionally nest it in a fieldset -->
  {#snippet innerHTML()}
  {#if hint}
  {@const hintId = idPrefix + '-hint' }
  {@const describedBy = describedBy ? describedBy + ' ' + hintId : hintId }
  <Hint
  id={hintId} classes={hint.classes}
  attributes={hint.attributes}
  html={hint.html}
  text={hint.text}/>
  {/if}
  {#if errorMessage}
  {@const errorId = idPrefix + '-error' }
  {@const describedBy = describedBy ? describedBy + ' ' + errorId : errorId }
  <ErrorMessage id={errorId} classes={errorMessage.classes}
  attributes={errorMessage.attributes}
  html={errorMessage.html}
  text={errorMessage.text}
  visuallyHiddenText={errorMessage.visuallyHiddenText}
  />
  {/if}
  <div class={["govuk-checkboxes", classes]}
  {...govukAttributes(attributes) data-module="govuk-checkboxes">
  {#if formGroup.beforeInputs }
  { formGroup.beforeInputs.html ?? formGroup.beforeInputs.text }
  {/if}
  {#for items as item}
  {#if item}
  {@render _checkboxItem(params, item, loop.index) }
  {/if}
  {/for}
  {#if formGroup.afterInputs}
  { formGroup.afterInputs.html ?? formGroup.afterInputs.text }
  {/if}
  </div>
  {/snippet}

  <div class={["govuk-form-group", errorMessage && "govuk-form-group--error", formGroup.classes ]}
  {...govukAttributes(params.formGroup.attributes) }>
  {#if hasFieldset }
  <Fieldset {describedBy}
  classes={fieldset.classes}
  attributes={fieldset.attributes}
  legend={fieldset.legend}
  html={trim( innerHtml())}/>
  {:else}
  {@render innerHTML()}
  {/if}
  </div>
