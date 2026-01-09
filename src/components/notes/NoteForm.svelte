<script lang="ts">
  import { createNote, updateNote } from "../../services/notes.api";

    export let note = null;
    export let onClose;
    export let onSuccess;

    let title: string = note ? note.title : '';
    let content: string = note ? note.content : '';
    let error = '';

    const isEditMode = !!note;

    async function submit() {
        if(!title.trim()) {
            error = 'Title is required';
            return
        }

        try {
            if(isEditMode){
                await updateNote(note._id, {title, content})
            } else {
                await createNote({title, content})
            }

            onSuccess();
            onClose();
        } catch (error) {
            error = error.message;
        }
    }
</script>

<div class="form">
    <h2>{isEditMode ? 'Edit Node' : 'Create Note'}</h2>
    <input bind:value={title} placeholder="Title"/>
    <textarea bind:value={content} placeholder="Content"></textarea>

    {#if error}
    <p class="error">{error}</p>
    {/if}

    <div class="actions">
        <button on:click={submit}>
            {isEditMode? 'Update' : 'Create'}
        </button>
        <button on:click={onClose}>Cancel</button>
    </div>
</div>

