<script lang="ts">
	let { text = 'Back', href = '#' }: { text: string; href: string } = $props();
</script>

<a {href} class="govuk-back-link">{text}</a>
