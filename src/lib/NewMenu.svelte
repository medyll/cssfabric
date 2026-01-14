
<script lang="ts">
	export let name = '';
	export const children = [];
	export let indent = 0;
	export let data: Record<string, any> = {};

	let open = true;

	function toggleOpen() {
		open = !open;
	}
</script>

<!-- <h3 style="padding-left: {indent}px" on:click={toggleOpen}>
	{name}
	{open ? '(open)' : '(closed)'}
</h3> -->

{#if open}
	{#each Object.keys(data) as key}
		<!-- {@html JSON.stringify(key)} -->
		{@const child = Object.values(data[key])}
		{@const ofType = typeof Object.values(data[key])?.[0] }
		<div class="flex-v">
			<div class=" border-r pad-1">
				{key} 
			</div>
		</div>
		{#if ofType == 'object' && Object.keys(data[key])?.[0] !='classNames' } 
			<div class="marg-l-4"><svelte:self data={data[key]} indent={indent + 24} /></div>
		{/if}
        
		{#if   Object.keys(data[key])?.[0] =='classNames' } 
			<div class="marg-l-4"><pre>{JSON.stringify(Object.keys(data[key].classNames),undefined,'             ')}</pre></div>
		{/if}
	{/each}
{/if}

<style>
</style>
