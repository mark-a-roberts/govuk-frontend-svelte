<script lang="ts">
	let { text = 'Skip to main content', href = '#' }: { text?: string; href?: string } = $props();
</script>

<a {href} class="govuk-skip-link" data-module="govuk-skip-link">{text}</a>
