export const fileSystem = () => {
  const files = [
    {
      name: "~",
      type: "dir",
      contents: [
        {
          name: "README",
          type: "text",
          contents: `<p>你好，我叫邓博文</p>`,
          description: "FOOO",
        },
        {
          name: "photo",
          type: "img",
          contents:
            "https://cn.bing.com/th?id=OHR.Chongyang2024_ZH-CN4180097837_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&w=3840&h=2160&rs=1&c=4",
        },

        {
          name: "myweb",
          type: "link",
          link: "https://dbw2004.top",
        },
        {
          name: "myprojects",
          type: "text",

          contents: `
          
          <ul>
          
          <li><a class="link"
          href="https://blog.dbw2004.top">blog.dbw2004.top  </a>vue+express写的博客系统</li>
       
                <li>
               <a class="link"
               href="https://dbw2004.top">dbw2004.top</a>
               vuepress搭建的个人网站
               </li>
             
              </ul>
              
              `,
        },
        {
          name: "contact_me",
          type: "dir",
          contents: [
            {
              name: "github",
              type: "link",
              link: "https://github.com/dengbowen666",
            },
            {
              name: 'bilibili',
              type: "link",
              link:'https://space.bilibili.com/446703056?spm_id_from=333.1007.0.0'
            }
          ],
        },
      ],
    },
  ];
  const find_dir_abspath: any = (
    pathArray: string[],
    index: number,
    currentfiles: any
  ) => {
    let currentLevelFind: boolean = false;
    let nextfilect = [];
    let nextfile;
    for (let i in currentfiles) {
      if (currentfiles[i].name === pathArray[index]) {
        // console.log(currentfiles[i]);

        currentLevelFind = true;
        nextfile = currentfiles[i];
        nextfilect = currentfiles[i].contents;
      }
    }
    if (currentLevelFind) {
      if (index < pathArray.length - 1) {
        return find_dir_abspath(pathArray, index + 1, nextfilect);
      } else {
        return nextfile;
      }
    } else {
      return false;
    }
  };

  const find_dir = (pathArray: string[], files: any, cwd: string) => {
    console.log(pathArray);
    let index = 0;

    if (pathArray[0] === "") {
      // 说明是以/开头的路径串，当作绝对路径，调用绝对路径的函数
      pathArray.shift();
      // 这里我以为是深拷贝，结果直接改变了原始数组，导致原始数组开头被去除

      console.log(pathArray);
      if (find_dir_abspath(pathArray, index, files)) {
        return "0";
      }
    } else {
      // 说明是以相对路径，调用相对路径的函数
      const pathArray2 = (cwd + "/" + pathArray.join("/")).split("/");
      console.log(pathArray2);
      if (find_dir_abspath(pathArray2, index, files)) {
        return "1";
      }
    }
    return "2";
  };
  const find_file = (fileName: string, files: any, cwd: string) => {
    const pathArray = (cwd + "/" + fileName).split("/");
    // console.log(pathArray);

    let index = 0;
    const file = find_dir_abspath(pathArray, index, files);
    console.log(file);
    if (file) {
      switch (file.type) {
        case "text":
          return ["text", file.contents];
        case "img":
          return ["img", file.contents];
        default:
          return ["none", ""];
      }
    } else {
      return ["none", ""];
    }
  };
  return {
    files,
    find_dir,
    find_file,
  };
};
