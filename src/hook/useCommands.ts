import { useStore } from "../store/index";
import { storeToRefs } from "pinia";

const Commands = () => {
  const { block_list } = storeToRefs(useStore());
  const COMMANDS = {
    // 坑：不能直接在全局引用store，此时pinia还没有use在app上

    help: function () {
      console.log(block_list.value);

      return (
        "You can navigate either by clicking on anything that " +
        '<a href="javascript:void(0)">underlines</a> when you put your mouse ' +
        "over it, or by typing commands in the terminal. Type the name of a " +
        '<span class="exec">link</span> to view it. Use "cd" to change into a ' +
        '<span class="dir">directory</span>, or use "ls" to list the contents ' +
        'of that directory. The contents of a <span class="text">file</span> ' +
        'can be viewed using "cat". <span class="img">Images</span> are ' +
        'displayed using "gimp".<br><br>If there is a command you want to get ' +
        "out of, press Ctrl+C or Ctrl+D.<br><br>"
      );
    },

    clear: function () {
      //   清空block_list

      block_list.value = [];

     //  console.log(block_list.value);
    },
  };

  return {
    COMMANDS,
  };
};
export default Commands;
