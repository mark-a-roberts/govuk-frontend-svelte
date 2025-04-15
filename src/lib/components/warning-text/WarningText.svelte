<script lang="ts">
    import {govukAttributes} from "$lib/helpers/attributes.js";
    interface IProps {
      id?: string;
      classes?: string | string[];
      html?: string;
      text?: string;
      iconFallbackText?: string
    }
    let { id, classes, attributes, html, text, iconFallbackText }: IProps = $props();
</script>

<div class={["govuk-warning-text", classes] }
     {...govukAttributes(attributes) }>
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
        <span class="govuk-visually-hidden">{ iconFallbackText ?? "Warning" }</span>
        {@render htmlOrText({html, text})}
    </strong>
</div>
