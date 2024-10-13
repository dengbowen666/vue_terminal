import { useStore } from "../store/index";
import { storeToRefs } from "pinia";
import { fileSystem } from "../file_system/index.js";
const { files, find_dir, find_file } = fileSystem();
const Commands = () => {
  const { block_list, cwd } = storeToRefs(useStore());
  const COMMANDS = {
    // 坑：不能直接在全局引用store，此时pinia还没有use在app上

    help: function () {
      console.log(block_list.value);

      return (
        "You can navigate by typing commands in the terminal. Type the name of a " +
        '<span class="link">link</span> to view it. Use <span class="dir">"cd"</span> to change into a ' +
        '<span class="dir">directory</span>, or use <span style="color:skyblue">"ls"</span> to list the contents ' +
        'of that directory. The contents of a <span class="text">file</span> ' +
        'can be viewed using "cat".<span class="img"> Images </span> are ' +
        'displayed using <span class="img">"gimp"</span>.' +
        'Use <span style="color:red">"clear"</span> to clear the terminal.' +
        'if you want to visit any website you can use <span style="color:brown">"curl"</span> to open it'+
        '<br><br>If there is something you could not understand, you can use <span style="color:green">"help"</span> to get this information '
      );
    },

    clear: function () {
      //   清空block_list

      block_list.value = [];
    },

    ls: function () {
      // 调用函数获取当前的路径，如~/dir1,用/分割，返回数组，遍历找到dir1，返回dir1下的所有文件/名，如['file1.txt', 'file2.txt', 'dir2']，用join(' ')拼接成字符串，返回，再渲染到content中 太难了递归
      function listFiles(pathArray: string[], files: object[], i: number) {
        let res = "";
        if (i === pathArray.length) {
          res = files
            .map((item) =>
              item.type === "link"
                ? `<a target="_blank" class="${item.type}" href="${item.link}"> ${item.name}</a>`
                : `<span class="${item.type}"> ${item.name}</span>`
            )
            .join(" ");
        }
        // 退出递归
        else {
          files.forEach((item) => {
            if (item.name === pathArray[i]) {
              if (item.type === "dir") {
                res = listFiles(pathArray, item.contents, i + 1);
              } else {
                res = `not dir`;
              }
            }
          });
        }
        return res;
      }

      // 大坑，files.forEach((item) => {
      //         if (item.name === pathArray[i]) {
      //           if (item.type === "dir") {
      //             return listFiles(pathArray, item.contents, i + 1);
      //           } else {
      //             return `not dir`;
      //           }
      // }之前代码 执行了函数，函数返回了一个东西，但是外层没有return，所以返回的是undefined

      const pathArray = cwd.value.split("/");
      return listFiles(pathArray, files, 0);

      // return "file1.txt file2.txt dir2"
    },
    cd: function (args: string) {
      let result = "";
      if (args === "help") {
        result = `
       <ul>
    <li>    cd [目录名]  进入指定目录 </li>
       <li>      cd ..  返回上一级目录</li>
       <li>      cd ~  返回主目录</li>
         <li>    cd -  返回上一个目录</li>
         <li>    cd help  查看帮助</li>
<ul>
        `;
      } else if (args === "-") {
        let index = block_list.value.length - 1;

        while (
          block_list.value[index].cwd == block_list.value[index - 1].cwd &&
          index > 0
        ) {
          index--;
        }
        // 确保找到上个不同的目录
        cwd.value = block_list.value[index - 1].cwd;
        console.log(index, cwd.value, block_list.value);

        // 回到上一个目录，需要获取上一个目录的路径，需要获取上一个目录的cwd
        result = "";
      } else if (args === "~") {
        cwd.value = "~";
        result = "";
      } else if (args === "") {
        result = "";
      } else if (args === "..") {
        const pathArray = cwd.value.split("/");
        if (pathArray.length > 1) {
          pathArray.pop();
          cwd.value = pathArray.join("/");
          result = "";
        }
      } else {
        const pathArray = args.split("/");
        // console.log(pathArray);
        if (find_dir(pathArray, files, cwd.value) == "0") {
          //console.log(pathArray);

          cwd.value = pathArray.join("/");
          // console.log(pathArray);

          result = "";
        } else if (find_dir(pathArray, files, cwd.value) == "1") {
          cwd.value = `${cwd.value}/${args}`;
          result = "";
        } else {
          result = `cd  ${args}: No such file or directory`;
        }
      }
      return result;
    },

    cwd: () => {
      return cwd.value;
    },

    cat: (args: string) => {
      if (args === "help")
        return `
        <ul>
        <li>cat [文件名]  查看文件内容</li>
        <li>cat [文件名1] [文件名2] ...  查看多个文件内容</li>
        <li>cat > [文件名]  创建文件</li>
        <li>cat >> [文件名]  追加文件</li>
        <li>cat -n [文件名]  查看文件内容并显示行号</li>
        <li>cat -b [文件名]  查看文件内容并显示行号，不显示空白行</li>
        </ul>`;
      else if (args === "") {
        return "cat: missing file operand";
      } else {
        const result = find_file(args, files, cwd.value);
        if (result[0] === "text") {
          return result[1];
        } else if (result[0] == "none") {
          return `cat: ${args}: No such file`;
        }
      }
    },
    gimp: (args: string) => {
      if (args === "help") {
        return `<ul>
        <li>gimp [文件名]  打开图片</li>
        </ul>`;
      } else if (args === "") {
        return "gimp: missing file operand";
      } else {
        const result = find_file(args, files, cwd.value);
        if (result[0] === "img") {
          return `<img src="${result[1]}" alt="image" width="100" height="120"> <br>`;
        } else if (result[0] == "none") {
          return `gimp: ${args}: No such file`;
          // `
        }
      }
    },
    curl: (args: string) => {
function processArgs(args) {
  if (args.startsWith("https://")) {
    return args.substring("https://".length);
  } else if (args.startsWith("http://")) {
    return args.substring("http://".length);
  } else {
    return args;
  }
}





      if (args === "help") {
        return `<ul>
        <li>curl [url]  访问url</li>
        </ul>`;
      } else if (args === "") {
        return "curl: missing link operand";
      } else {
      window.open('https://'+processArgs(args));
      }
    }
  };
  return {
    COMMANDS,
  };
};
export default Commands;
