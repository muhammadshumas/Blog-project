<template>
    <div>
         <form action="" @submit.prevent="search">

            <div class="my-2 mx-auto">
                <label for="search_title">Search Title <input v-model="title" ref="title"  class="form-control" id="search_title" type="text" ></label>
            </div>
            
            <div class="my-2 mx-auto">
                <label for="search_tag">Search Tag <input v-model="tag" ref="tag" class="form-control" id="search_tag" type="text" ></label>
            </div>
            
            <div class="my-2 mx-auto">
                <input type="submit" class="btn btn-primary">
            </div>

         </form>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name:'search',
        data() {
            return {
               title:'',
               tag:'',
            }
        },
            methods:{
                        search(){

                            if(this.title!='' && this.tag==''){
                                
                                this.$store.dispatch('search',{title:this.title})
                                this.$refs.title='';
                            
                            }

                            else if(this.tag!='' && this.title==''){
                                
                                this.$store.dispatch('search',{tag:this.tag})
                                this.$refs.tag='';
                            }
                           }
                    }
        
    }
</script>

<style>

</style>