//area imgs & code

function getCountrys() {
    let list = [
        {
            name: 'A',
            title: '澳大利亚',
            imgsrc: 'https://img.wikifx.com/flag/045fe4098d24356d/AU.png_wiki-template-global',
            code: '0061'
        },
        {
            name: 'A',
            title: '埃及',
            imgsrc: 'https://img.wikifx.com/flag/db390907541a234b/EG.png_wiki-template-global',
            code: '0020'
        },
        {
            name: 'A',
            title: '阿联酋',
            imgsrc: 'https://img.wikifx.com/flag/f6c94c275a58dcd7/AE.png_wiki-template-global',
            code: '00971'
        },
        {
            name: 'A',
            title: '安圭拉',
            imgsrc: 'https://img.wikifx.com/flag/1a3a55c9a37428c6/AI.png_wiki-template-global',
            code: '001264'
        },
        {
            name: 'A',
            title: '阿鲁巴',
            imgsrc: 'https://img.wikifx.com/flag/de8f485d2cc77947/AW.png_wiki-template-global',
            code: '00297'
        },
        {
            name: 'A',
            title: '阿曼',
            imgsrc: 'https://img.wikifx.com/flag/82222b0f8f991f14/OM.png_wiki-template-global',
            code: '0020'
        },
        {
            name: 'A',
            title: '爱尔兰',
            imgsrc: 'https://img.wikifx.com/flag/0d23f34c4255d924/IE.png_wiki-template-global',
            code: '00353'
        },
        {
            name: 'A',
            title: '爱沙尼亚',
            imgsrc: 'https://img.wikifx.com/flag/d1d8fc1014dd54bc/EE.png_wiki-template-global',
            code: '00372'
        },
        {
            name: 'A',
            title: '埃塞俄比亚',
            imgsrc: 'https://img.wikifx.com/flag/8b78679b4675941f/ET.png_wiki-template-global',
            code: '00251'
        },
        {
            name: 'A',
            title: '奥地利',
            imgsrc: 'https://img.wikifx.com/flag/740aa25870ced6b9/AT.png_wiki-template-global',
            code: '0043'
        },
        {
            name: 'A',
            title: '阿根廷',
            imgsrc: 'https://img.wikifx.com/flag/98a0d06efa6933a9/AR.png_wiki-template-global',
            code: '0054'
        },
        {
            name: 'A',
            title: '阿塞拜疆',
            imgsrc: 'https://img.wikifx.com/flag/eb981c7f0aabcaeb/AZ.png_wiki-template-global',
            code: '00994'
        },
        {
            name: 'A',
            title: '安提瓜和巴布达',
            imgsrc: 'https://img.wikifx.com/flag/b7ccf80851beb06d/AG.png_wiki-template-global',
            code: '001268'
        },
        {
            name: 'A',
            title: '安哥拉',
            imgsrc: 'https://img.wikifx.com/flag/613d8b9f4f7f3980/AO.png_wiki-template-global',
            code: '00244'
        },
        {
            name: 'A',
            title: '安道尔',
            imgsrc: 'https://img.wikifx.com/flag/166d73366e798681/AD.png_wiki-template-global',
            code: '00376'
        },
        {
            name: 'A',
            title: '阿尔及利亚',
            imgsrc: 'https://img.wikifx.com/flag/5daea5f9e813128f/DZ.png_wiki-template-global',
            code: '00213'
        },
        {
            name: 'A',
            title: '阿尔巴尼亚',
            imgsrc: 'https://img.wikifx.com/flag/304dc3ef15e69b9f/AL.png_wiki-template-global',
            code: '00355'
        },
        {
            name: 'A',
            title: '阿富汗',
            imgsrc: 'https://img.wikifx.com/flag/72d78b7e3ea74697/AF.png_wiki-template-global',
            code: '0093'
        },
        {
            name: "B",
            title: "布基纳法索",
            imgsrc: "https://img.wikifx.com/flag/148f52cad46e3319/BF.png_wiki-template-global",
            code: "00226"
        },
        {
            name: "B",
            title: "波多黎各",
            imgsrc: "https://img.wikifx.com/flag/89c2ea3f123621d0/PR.png_wiki-template-global",
            code: "001787"
        },
        {
            name: "B",
            title: "波多黎各",
            imgsrc: "https://img.wikifx.com/flag/89c2ea3f123621d0/PR.png_wiki-template-global",
            code: "001939"
        },
        {
            name: "B",
            title: "波兰",
            imgsrc: "https://img.wikifx.com/flag/068dc4d5517bfae9/PL.png_wiki-template-global",
            code: "0048"
        },
        {
            name: "B",
            title: "巴拉圭",
            imgsrc: "https://img.wikifx.com/flag/e49b47abccd510e5/PY.png_wiki-template-global",
            code: "00595"
        },
        {
            name: "B",
            title: "巴布亚新几内亚",
            imgsrc: "https://img.wikifx.com/flag/3598e4d63f4a0a87/PG.png_wiki-template-global",
            code: "00675"
        },
        {
            name: "B",
            title: "巴拿马",
            imgsrc: "https://img.wikifx.com/flag/209115c5cef3f450/PA.png_wiki-template-global",
            code: "00507"
        },
        {
            name: "B",
            title: "巴基斯坦",
            imgsrc: "https://img.wikifx.com/flag/c8bb93b8d287dce6/PK.png_wiki-template-global",
            code: "0092"
        },
        {
            name: "B",
            title: "北马里亚纳群岛",
            imgsrc: "https://img.wikifx.com/flag/859bd1e56cf99af6/MP.png_wiki-template-global",
            code: "001670"
        },
        {
            name: "B",
            title: "冰岛",
            imgsrc: "https://img.wikifx.com/flag/12effc1bae4d3766/IS.png_wiki-template-global",
            code: "00354"
        },
        {
            name: "B",
            title: "巴勒斯坦",
            imgsrc: "https://img.wikifx.com/flag/b455ac79dd5ff47c/PS.png_wiki-template-global",
            code: "0092"
        },
        {
            name: "B",
            title: "贝宁",
            imgsrc: "https://img.wikifx.com/flag/f5be05e1e9caded4/BJ.png_wiki-template-global",
            code: "00229"
        },
        {
            name: "B",
            title: "白俄罗斯",
            imgsrc: "https://img.wikifx.com/flag/a51a924ab68d9812/BY.png_wiki-template-global",
            code: "00375"
        },
        {
            name: "B",
            title: "布隆迪",
            imgsrc: "https://img.wikifx.com/flag/997b9b290bd7c57a/BI.png_wiki-template-global",
            code: "00257"
        },
        {
            name: "B",
            title: "保加利亚",
            imgsrc: "https://img.wikifx.com/flag/fe86af962cd15a16/BG.png_wiki-template-global",
            code: "00359"
        },
        {
            name: "B",
            title: "伯利兹",
            imgsrc: "https://img.wikifx.com/flag/ca3b21f17c5f3557/BZ.png_wiki-template-global",
            code: "00501"
        },
        {
            name: "B",
            title: "巴西",
            imgsrc: "https://img.wikifx.com/flag/3137cbadd21ce901/BR.png_wiki-template-global",
            code: "0055"
        },
        {
            name: "B",
            title: "博茨瓦纳",
            imgsrc: "https://img.wikifx.com/flag/681575bca3e4eff6/BW.png_wiki-template-global",
            code: "00267"
        },
        {
            name: "B",
            title: "波黑",
            imgsrc: "https://img.wikifx.com/flag/62601df84b7923b9/BA.png_wiki-template-global",
            code: "00387"
        },
        {
            name: "B",
            title: "玻利维亚",
            imgsrc: "https://img.wikifx.com/flag/c2a49bbac1b3426a/BO.png_wiki-template-global",
            code: "00591"
        },
        {
            name: "B",
            title: "不丹",
            imgsrc: "https://img.wikifx.com/flag/8bb6fba9845a8137/BT.png_wiki-template-global",
            code: "00975"
        },
        {
            name: "B",
            title: "百慕大",
            imgsrc: "https://img.wikifx.com/flag/1630360a9b336146/BM.png_wiki-template-global",
            code: "001441"
        },
        {
            name: "B",
            title: "比利时",
            imgsrc: "https://img.wikifx.com/flag/c679f9af82eb9a3b/BE.png_wiki-template-global",
            code: "0032"
        },
        {
            name: "B",
            title: "巴巴多斯",
            imgsrc: "https://img.wikifx.com/flag/db16a7eee539e93e/BB.png_wiki-template-global",
            code: "001246"
        },
        {
            name: "B",
            title: "巴林",
            imgsrc: "https://img.wikifx.com/flag/aeff33338948c1e0/BH.png_wiki-template-global",
            code: "00973"
        },
        {
            name: "B",
            title: "巴哈马",
            imgsrc: "https://img.wikifx.com/flag/a3416b1055b8ffb9/BS.png_wiki-template-global",
            code: "001242"
        },
        {
            name: "C",
            title: "朝鲜",
            imgsrc: "https://img.wikifx.com/flag/b1640de6534fea0e/KP.png_wiki-template-global",
            code: "00850"
        },
        {
            name: "C",
            title: "赤道几内亚",
            imgsrc: "https://img.wikifx.com/flag/a4794422c7068158/GQ.png_wiki-template-global",
            code: "00240"
        },

        {
            name: "D",
            title: "多哥",
            imgsrc: "https://img.wikifx.com/flag/ab3cef39a9a2298f/TG.png_wiki-template-global",
            code: "00228"
        },
        {
            name: "D",
            title: "东帝汶",
            imgsrc: "https://img.wikifx.com/flag/ebdb14023f4f5388/TL.png_wiki-template-global",
            code: "00670"
        },
        {
            name: "D",
            title: "德国",
            imgsrc: "https://img.wikifx.com/flag/2ed6fcde5bf696a6/DE.png_wiki-template-global",
            code: "0049"
        },
        {
            name: "D",
            title: "多米尼加",
            imgsrc: "https://img.wikifx.com/flag/6925b610710d93e2/DO.png_wiki-template-global",
            code: "001849"
        },
        {
            name: "D",
            title: "多米尼克",
            imgsrc: "https://img.wikifx.com/flag/252b442ac6ecf474/DM.png_wiki-template-global",
            code: "001767"
        },
        {
            name: "D",
            title: "丹麦",
            imgsrc: "https://img.wikifx.com/flag/5579d4e518c6d4ab/DK.png_wiki-template-global",
            code: "0045"
        },

        {
            name: "E",
            title: "俄罗斯",
            imgsrc: "https://img.wikifx.com/flag/059650ee40cab30b/RU.png_wiki-template-global",
            code: "007"
        },
        {
            name: "E",
            title: "厄立特里亚",
            imgsrc: "https://img.wikifx.com/flag/4883ca6deaada839/ER.png_wiki-template-global",
            code: "00291"
        },
        {
            name: "E",
            title: "厄瓜多尔",
            imgsrc: "https://img.wikifx.com/flag/867d70225deda786/EC.png_wiki-template-global",
            code: "00593"
        },

        {
            name: "F",
            title: "菲律宾",
            imgsrc: "https://img.wikifx.com/flag/f095e4198da40884/PH.png_wiki-template-global",
            code: "0063"
        },
        {
            name: "F",
            title: "法属波利尼西亚",
            imgsrc: "https://img.wikifx.com/flag/b5d026e4a6011eb9/PF.png_wiki-template-global",
            code: "00689"
        },
        {
            name: "F",
            title: "法属圭亚那",
            imgsrc: "https://img.wikifx.com/flag/7660314f711a68fc/GF.png_wiki-template-global",
            code: "00594"
        },
        {
            name: "F",
            title: "梵蒂冈",
            imgsrc: "https://img.wikifx.com/flag/3467b1bcf46522b8/VA.png_wiki-template-global",
            code: "00379"
        },
        {
            name: "F",
            title: "斐济群岛",
            imgsrc: "https://img.wikifx.com/flag/2fd26c429ccd6a13/FJ.png_wiki-template-global",
            code: "00679"
        },
        {
            name: "F",
            title: "法国",
            imgsrc: "https://img.wikifx.com/flag/432747c2bcd97b82/FR.png_wiki-template-global",
            code: "0033"
        },
        {
            name: "F",
            title: "芬兰",
            imgsrc: "https://img.wikifx.com/flag/ca953a9a63b44596/FI.png_wiki-template-global",
            code: "00358"
        },
        {
            name: "F",
            title: "法罗群岛",
            imgsrc: "https://img.wikifx.com/flag/6542bbcf6e14417a/FO.png_wiki-template-global",
            code: "00298"
        },
        {
            name: "F",
            title: "佛得角",
            imgsrc: "https://img.wikifx.com/flag/4bc49ebacde4ffe0/CV.png_wiki-template-global",
            code: "00238"
        },

        {
            name: "G",
            title: "圭亚那",
            imgsrc: "https://img.wikifx.com/flag/806ca426cd651517/GY.png_wiki-template-global",
            code: "00592"
        },
        {
            name: "G",
            title: "关岛",
            imgsrc: "https://img.wikifx.com/flag/cc61a56dc5b23717/GU.png_wiki-template-global",
            code: "001671"
        },
        {
            name: "G",
            title: "瓜德罗普",
            imgsrc: "https://img.wikifx.com/flag/d788dcf41f399818/GP.png_wiki-template-global",
            code: "00590"
        },
        {
            name: "G",
            title: "格林纳达",
            imgsrc: "https://img.wikifx.com/flag/5e46821195a55359/GD.png_wiki-template-global",
            code: "001473"
        },
        {
            name: "G",
            title: "格陵兰",
            imgsrc: "https://img.wikifx.com/flag/37c6f0d638fe7988/GL.png_wiki-template-global",
            code: "00299"
        },
        {
            name: "G",
            title: "冈比亚",
            imgsrc: "https://img.wikifx.com/flag/41ab8d6ba545a1ae/GM.png_wiki-template-global",
            code: "00220"
        },
        {
            name: "G",
            title: "格鲁吉亚",
            imgsrc: "https://img.wikifx.com/flag/28adf4199f224c2a/GE.png_wiki-template-global",
            code: "00995"
        },
        {
            name: "G",
            title: "古巴",
            imgsrc: "https://img.wikifx.com/flag/34a373cb63a0a919/CU.png_wiki-template-global",
            code: "0053"
        },
        {
            name: "G",
            title: "哥斯达黎加",
            imgsrc: "https://img.wikifx.com/flag/26ca22c2011aaa97/CR.png_wiki-template-global",
            code: "00506"
        },
        {
            name: "G",
            title: "刚果（金）",
            imgsrc: "https://img.wikifx.com/flag/af571e8d0d59fdad/CD.png_wiki-template-global",
            code: "00243"
        },
        {
            name: "G",
            title: "刚果（布）",
            imgsrc: "https://img.wikifx.com/flag/6cac8bee468e86d1/CG.png_wiki-template-global",
            code: "00242"
        },
        {
            name: "G",
            title: "哥伦比亚",
            imgsrc: "https://img.wikifx.com/flag/e2f2cc22822e30be/CO.png_wiki-template-global",
            code: "0057"
        },

        {
            name: "H",
            title: "荷兰",
            imgsrc: "https://img.wikifx.com/flag/a2839412d79dbc5f/NL.png_wiki-template-global",
            code: "0031"
        },
        {
            name: "H",
            title: "黑山",
            imgsrc: "https://img.wikifx.com/flag/86f0118c40ba2385/ME.png_wiki-template-global",
            code: "00382"
        },
        {
            name: "H",
            title: "韩国",
            imgsrc: "https://img.wikifx.com/flag/66dbd0d47a2b876c/KR.png_wiki-template-global",
            code: "0082"
        },
        {
            name: "H",
            title: "哈萨克斯坦",
            imgsrc: "https://img.wikifx.com/flag/b4564ec96bc6605c/KZ.png_wiki-template-global",
            code: "007"
        },
        {
            name: "H",
            title: "洪都拉斯",
            imgsrc: "https://img.wikifx.com/flag/028a717ff89985bc/HN.png_wiki-template-global",
            code: "00504"
        },
        {
            name: "H",
            title: "海地",
            imgsrc: "https://img.wikifx.com/flag/a8247d656ef6b480/HT.png_wiki-template-global",
            code: "00509"
        },

        {
            name: "J",
            title: "津巴布韦",
            imgsrc: "https://img.wikifx.com/flag/703e0ca872729699/ZW.png_wiki-template-global",
            code: "00263"
        },
        {
            name: "J",
            title: "几内亚比绍",
            imgsrc: "https://img.wikifx.com/flag/520be36addbeb5d2/GW.png_wiki-template-global",
            code: "00245"
        },
        {
            name: "J",
            title: "吉尔吉斯斯坦",
            imgsrc: "https://img.wikifx.com/flag/adb8bbfd8b47390d/KG.png_wiki-template-global",
            code: "00996"
        },
        {
            name: "J",
            title: "几内亚",
            imgsrc: "https://img.wikifx.com/flag/ecd826aac8906599/GN.png_wiki-template-global",
            code: "00224"
        },
        {
            name: "J",
            title: "基里巴斯",
            imgsrc: "https://img.wikifx.com/flag/b732b054dda58605/KI.png_wiki-template-global",
            code: "00686"
        },
        {
            name: "J",
            title: "加纳",
            imgsrc: "https://img.wikifx.com/flag/8e786062f1b23476/GH.png_wiki-template-global",
            code: "00233"
        },
        {
            name: "J",
            title: "加蓬",
            imgsrc: "https://img.wikifx.com/flag/498985e538753ea8/GA.png_wiki-template-global",
            code: "00241"
        },
        {
            name: "J",
            title: "吉布提",
            imgsrc: "https://img.wikifx.com/flag/603825cc6999e48c/DJ.png_wiki-template-global",
            code: "00253"
        },
        {
            name: "J",
            title: "捷克",
            imgsrc: "https://img.wikifx.com/flag/4963ceb76aaaa2ca/CZ.png_wiki-template-global",
            code: "00420"
        },
        {
            name: "J",
            title: "加拿大",
            imgsrc: "https://img.wikifx.com/flag/b4b32b9e9479f387/CA.png_wiki-template-global",
            code: "001"
        },
        {
            name: "J",
            title: "柬埔寨",
            imgsrc: "https://img.wikifx.com/flag/6334c4db5a83bbbc/KH.png_wiki-template-global",
            code: "00855"
        },

        {
            name: "K",
            title: "卡塔尔",
            imgsrc: "https://img.wikifx.com/flag/a13802a6674d5327/QA.png_wiki-template-global",
            code: "00974"
        },
        {
            name: "K",
            title: "科威特",
            imgsrc: "https://img.wikifx.com/flag/bc72de7092be76ff/KW.png_wiki-template-global",
            code: "00965"
        },
        {
            name: "K",
            title: "肯尼亚",
            imgsrc: "https://img.wikifx.com/flag/8816e5ef78463929/KE.png_wiki-template-global",
            code: "00254"
        },
        {
            name: "K",
            title: "科特迪瓦",
            imgsrc: "https://img.wikifx.com/flag/75d6d6ace27ef929/CI.png_wiki-template-global",
            code: "00225"
        },
        {
            name: "K",
            title: "克罗地亚",
            imgsrc: "https://img.wikifx.com/flag/a5f85d025963f99f/HR.png_wiki-template-global",
            code: "00385"
        },
        {
            name: "K",
            title: "库克群岛",
            imgsrc: "https://img.wikifx.com/flag/2e8ac3e3fe7bc32b/CK.png_wiki-template-global",
            code: "00682"
        },
        {
            name: "K",
            title: "科摩罗",
            imgsrc: "https://img.wikifx.com/flag/b31ec27223fee2c6/KM.png_wiki-template-global",
            code: "00269"
        },
        {
            name: "K",
            title: "科科斯群岛",
            imgsrc: "https://img.wikifx.com/flag/650dfd85c4f59fa1/CC.png_wiki-template-global",
            code: "0061"
        },
        {
            name: "K",
            title: "开曼群岛",
            imgsrc: "https://img.wikifx.com/flag/1a83f61d19760277/KY.png_wiki-template-global",
            code: "001345"
        },
        {
            name: "K",
            title: "喀麦隆",
            imgsrc: "https://img.wikifx.com/flag/2d4e8210a2a573b9/CM.png_wiki-template-global",
            code: "00237"
        },

        {
            name: "L",
            title: "卢旺达",
            imgsrc: "https://img.wikifx.com/flag/36504b7a65191caf/RW.png_wiki-template-global",
            code: "00250"
        },
        {
            name: "L",
            title: "罗马尼亚",
            imgsrc: "https://img.wikifx.com/flag/cabad73d1bf2de7b/RO.png_wiki-template-global",
            code: "0040"
        },
        {
            name: "L",
            title: "留尼汪",
            imgsrc: "https://img.wikifx.com/flag/b2cbd36462d3aa20/RE.png_wiki-template-global",
            code: "00262"
        },
        {
            name: "L",
            title: "卢森堡",
            imgsrc: "https://img.wikifx.com/flag/f3d2ad926a6d590a/LU.png_wiki-template-global",
            code: "00352"
        },
        {
            name: "L",
            title: "立陶宛",
            imgsrc: "https://img.wikifx.com/flag/89d77eb9dfb70746/LT.png_wiki-template-global",
            code: "00370"
        },
        {
            name: "L",
            title: "列支敦士登",
            imgsrc: "https://img.wikifx.com/flag/a99dc4820b992895/LI.png_wiki-template-global",
            code: "00423"
        },
        {
            name: "L",
            title: "利比亚",
            imgsrc: "https://img.wikifx.com/flag/334cab079503451a/LY.png_wiki-template-global",
            code: "00218"
        },
        {
            name: "L",
            title: "利比里亚",
            imgsrc: "https://img.wikifx.com/flag/affbd575ca6fb361/LR.png_wiki-template-global",
            code: "00231"
        },
        {
            name: "L",
            title: "拉脱维亚",
            imgsrc: "https://img.wikifx.com/flag/cb21f0abbf9f878c/LV.png_wiki-template-global",
            code: "00371"
        },
        {
            name: "L",
            title: "莱索托",
            imgsrc: "https://img.wikifx.com/flag/c8d32d5af0f36e54/LS.png_wiki-template-global",
            code: "00266"
        },
        {
            name: "L",
            title: "黎巴嫩",
            imgsrc: "https://img.wikifx.com/flag/425b15fc20c64da4/LB.png_wiki-template-global",
            code: "00961"
        },
        {
            name: "L",
            title: "老挝",
            imgsrc: "https://img.wikifx.com/flag/a0e5a93eef072429/LA.png_wiki-template-global",
            code: "00856"
        },

        {
            name: "M",
            title: "美国",
            imgsrc: "https://img.wikifx.com/flag/adaa5e0b8a65a672/US.png_wiki-template-global",
            code: "001"
        },
        {
            name: "M",
            title: "美属维尔京群岛",
            imgsrc: "https://img.wikifx.com/flag/ee3ceb57a09c96ef/VI.png_wiki-template-global",
            code: "001340"
        },
        {
            name: "M",
            title: "马恩岛",
            imgsrc: "https://img.wikifx.com/flag/c223c96f8e6ccc29/IM.png_wiki-template-global",
            code: "0044"
        },
        {
            name: "M",
            title: "马其顿",
            imgsrc: "https://img.wikifx.com/flag/9564863b88d5c43c/MK.png_wiki-template-global",
            code: "00389"
        },
        {
            name: "M",
            title: "秘鲁",
            imgsrc: "https://img.wikifx.com/flag/4396fa1c87870713/PE.png_wiki-template-global",
            code: "0051"
        },
        {
            name: "M",
            title: "马绍尔群岛",
            imgsrc: "https://img.wikifx.com/flag/064e874ecf4f5def/MH.png_wiki-template-global",
            code: "00692"
        },
        {
            name: "M",
            title: "密克罗尼西亚联邦",
            imgsrc: "https://img.wikifx.com/flag/82a7bb18a97d720c/FM.png_wiki-template-global",
            code: "00691"
        },
        {
            name: "M",
            title: "莫桑比克",
            imgsrc: "https://img.wikifx.com/flag/b99757c3a878f2d2/MZ.png_wiki-template-global",
            code: "00258"
        },
        {
            name: "M",
            title: "摩洛哥",
            imgsrc: "https://img.wikifx.com/flag/5313bf5dab1e4352/MA.png_wiki-template-global",
            code: "00212"
        },
        {
            name: "M",
            title: "摩尔多瓦",
            imgsrc: "https://img.wikifx.com/flag/da5549d351765bd9/MD.png_wiki-template-global",
            code: "00373"
        },
        {
            name: "M",
            title: "蒙古国↵                    蒙古",
            imgsrc: "https://img.wikifx.com/flag/5ac17fe7bc39fdaa/MN.png_wiki-template-global",
            code: "00976"
        },
        {
            name: "M",
            title: "摩纳哥",
            imgsrc: "https://img.wikifx.com/flag/8b4cf53cca4095e4/MC.png_wiki-template-global",
            code: "00377"
        },
        {
            name: "M",
            title: "墨西哥",
            imgsrc: "https://img.wikifx.com/flag/cb2cc6fd60358a45/MX.png_wiki-template-global",
            code: "0052"
        },
        {
            name: "M",
            title: "毛里求斯",
            imgsrc: "https://img.wikifx.com/flag/cf2e803bdbc98334/MU.png_wiki-template-global",
            code: "00230"
        },
        {
            name: "M",
            title: "毛里塔尼亚",
            imgsrc: "https://img.wikifx.com/flag/d51659f96279c470/MR.png_wiki-template-global",
            code: "00222"
        },
        {
            name: "M",
            title: "马提尼克",
            imgsrc: "https://img.wikifx.com/flag/7765890f2a706c77/MQ.png_wiki-template-global",
            code: "00596"
        },
        {
            name: "M",
            title: "马耳他",
            imgsrc: "https://img.wikifx.com/flag/491037714d09263a/MT.png_wiki-template-global",
            code: "00356"
        },
        {
            name: "M",
            title: "马里",
            imgsrc: "https://img.wikifx.com/flag/1e9dde8bd3dc247a/ML.png_wiki-template-global",
            code: "00223"
        },
        {
            name: "M",
            title: "马尔代夫",
            imgsrc: "https://img.wikifx.com/flag/e5c080038b043ead/MV.png_wiki-template-global",
            code: "00960"
        },
        {
            name: "M",
            title: "马来西亚",
            imgsrc: "https://img.wikifx.com/flag/dded20f8b8d376dd/MY.png_wiki-template-global",
            code: "0060"
        },
        {
            name: "M",
            title: "马拉维",
            imgsrc: "https://img.wikifx.com/flag/90492c8259307985/MW.png_wiki-template-global",
            code: "00265"
        },
        {
            name: "M",
            title: "马达加斯加",
            imgsrc: "https://img.wikifx.com/flag/4d913f87fe07cad2/MG.png_wiki-template-global",
            code: "00261"
        },
        {
            name: "M",
            title: "马尔维纳斯群岛（↵                    福克兰）",
            imgsrc: "https://img.wikifx.com/flag/afd95af91e280d1e/FK.png_wiki-template-global",
            code: "00500"
        },
        {
            name: "M",
            title: "马约特",
            imgsrc: "https://img.wikifx.com/flag/46b6232662fff871/YT.png_wiki-template-global",
            code: "00262"
        },
        {
            name: "M",
            title: "缅甸",
            imgsrc: "https://img.wikifx.com/flag/87c942f9dd521605/MM.png_wiki-template-global",
            code: "0095"
        },
        {
            name: "M",
            title: "孟加拉",
            imgsrc: "https://img.wikifx.com/flag/be4714701a8bc235/BD.png_wiki-template-global",
            code: "00880"
        },
        {
            name: "M",
            title: "美属萨摩亚",
            imgsrc: "https://img.wikifx.com/flag/484301fa800100e1/AS.png_wiki-template-global",
            code: "001684"
        },

        {
            name: "N",
            title: "南苏丹",
            imgsrc: "https://img.wikifx.com/flag/abc83a52ab8982f5/SS.png_wiki-template-global",
            code: "00211"
        },
        {
            name: "N",
            title: "南非",
            imgsrc: "https://img.wikifx.com/flag/10645c82f5e37cbe/ZA.png_wiki-template-global",
            code: "0027"
        },
        {
            name: "N",
            title: "挪威",
            imgsrc: "https://img.wikifx.com/flag/a00553e7a01d369c/NO.png_wiki-template-global",
            code: "0047"
        },
        {
            name: "N",
            title: "诺福克岛",
            imgsrc: "https://img.wikifx.com/flag/e1411f6b6fffcd1c/NF.png_wiki-template-global",
            code: "00672"
        },
        {
            name: "N",
            title: "瑙鲁",
            imgsrc: "https://img.wikifx.com/flag/1fe1366e93d2e29a/NR.png_wiki-template-global",
            code: "00674"
        },
        {
            name: "N",
            title: "纽埃",
            imgsrc: "https://img.wikifx.com/flag/1efd9874f38be79b/NU.png_wiki-template-global",
            code: "00683"
        },
        {
            name: "N",
            title: "尼日利亚",
            imgsrc: "https://img.wikifx.com/flag/ee723b715ee14837/NG.png_wiki-template-global",
            code: "00234"
        },
        {
            name: "N",
            title: "尼日尔",
            imgsrc: "https://img.wikifx.com/flag/3993e0d50896e533/NE.png_wiki-template-global",
            code: "00227"
        },
        {
            name: "N",
            title: "尼加拉瓜",
            imgsrc: "https://img.wikifx.com/flag/e7ddec3a931ca45d/NI.png_wiki-template-global",
            code: "00505"
        },
        {
            name: "N",
            title: "尼泊尔",
            imgsrc: "https://img.wikifx.com/flag/028c861affc259b1/NP.png_wiki-template-global",
            code: "00977"
        },
        {
            name: "N",
            title: "纳米比亚",
            imgsrc: "https://img.wikifx.com/flag/cf4caa22ad92fab4/NA.png_wiki-template-global",
            code: "00264"
        },
        {
            name: "N",
            title: "南极洲",
            imgsrc: "https://img.wikifx.com/flag/81ba573eb9029a9a/AQ.png_wiki-template-global",
            code: "00672"
        },

        {
            name: "P",
            title: "葡萄牙",
            imgsrc: "https://img.wikifx.com/flag/8fe4d3273d0237ec/PT.png_wiki-template-global",
            code: "00351"
        },
        {
            name: "P",
            title: "皮特凯恩群岛",
            imgsrc: "https://img.wikifx.com/flag/4dc52f374d908e03/PN.png_wiki-template-global",
            code: "00870"
        },
        {
            name: "P",
            title: "帕劳",
            imgsrc: "https://img.wikifx.com/flag/a817dfc458598a5d/PW.png_wiki-template-global",
            code: "00680"
        },
        {
            name: "R",
            title: "瑞士",
            imgsrc: "https://img.wikifx.com/flag/c5d1032317d13a2e/CH.png_wiki-template-global",
            code: "0041"
        },
        {
            name: "R",
            title: "瑞典",
            imgsrc: "https://img.wikifx.com/flag/eab679aa2edfaff8/SE.png_wiki-template-global",
            code: "0046"
        },
        {
            name: "R",
            title: "日本",
            imgsrc: "https://img.wikifx.com/flag/afb23edb45c6c8cf/JP.png_wiki-template-global",
            code: "0081"
        },
        {
            name: "S",
            title: "塞浦路斯",
            imgsrc: "https://img.wikifx.com/flag/8c64158622b74280/CY.png_wiki-template-global",
            code: "00357"
        },
        {
            name: "S",
            title: "萨摩亚",
            imgsrc: "https://img.wikifx.com/flag/f130c81e6ae8432a/WS.png_wiki-template-global",
            code: "00685"
        },
        {
            name: "S",
            title: "斯威士兰",
            imgsrc: "https://img.wikifx.com/flag/ad2c8290efe57b63/SZ.png_wiki-template-global",
            code: "00268"
        },
        {
            name: "S",
            title: "苏里南",
            imgsrc: "https://img.wikifx.com/flag/27e13509d3644362/SR.png_wiki-template-global",
            code: "00597"
        },
        {
            name: "S",
            title: "苏丹",
            imgsrc: "https://img.wikifx.com/flag/c1d339c277c0669e/SD.png_wiki-template-global",
            code: "00249"
        },
        {
            name: "S",
            title: "索马里",
            imgsrc: "https://img.wikifx.com/flag/392de5f1d53acdd6/SO.png_wiki-template-global",
            code: "00252"
        },
        {
            name: "S",
            title: "斯洛文尼亚",
            imgsrc: "https://img.wikifx.com/flag/ab3ae0bdf522cd08/SI.png_wiki-template-global",
            code: "00386"
        },
        {
            name: "S",
            title: "斯洛伐克",
            imgsrc: "https://img.wikifx.com/flag/27110108a10a88e9/SK.png_wiki-template-global",
            code: "00421"
        },
        {
            name: "S",
            title: "塞拉利昂",
            imgsrc: "https://img.wikifx.com/flag/3b654b3a79e7b898/SL.png_wiki-template-global",
            code: "00232"
        },
        {
            name: "S",
            title: "塞舌尔",
            imgsrc: "https://img.wikifx.com/flag/cc17d66c67781411/SC.png_wiki-template-global",
            code: "00248"
        },
        {
            name: "S",
            title: "塞尔维亚",
            imgsrc: "https://img.wikifx.com/flag/eeb7c783e8bfaa73/RS.png_wiki-template-global",
            code: "00381"
        },
        {
            name: "S",
            title: "塞内加尔",
            imgsrc: "https://img.wikifx.com/flag/ce75444ee14be2eb/SN.png_wiki-template-global",
            code: "00221"
        },
        {
            name: "S",
            title: "沙特阿拉伯",
            imgsrc: "https://img.wikifx.com/flag/5ff18f31dc30df59/SA.png_wiki-template-global",
            code: "00966"
        },
        {
            name: "S",
            title: "圣多美和普林西比",
            imgsrc: "https://img.wikifx.com/flag/1f07e31203035548/ST.png_wiki-template-global",
            code: "00239"
        },
        {
            name: "S",
            title: "圣马力诺",
            imgsrc: "https://img.wikifx.com/flag/e30646f5a3f3e2a7/SM.png_wiki-template-global",
            code: "00378"
        },
        {
            name: "S",
            title: "圣文森特和格林纳丁斯",
            imgsrc: "https://img.wikifx.com/flag/d9b838be26989d10/VC.png_wiki-template-global",
            code: "001784"
        },
        {
            name: "S",
            title: "圣皮埃尔和密克隆",
            imgsrc: "https://img.wikifx.com/flag/013b04776f5b06bc/PM.png_wiki-template-global",
            code: "00508"
        },
        {
            name: "S",
            title: "圣卢西亚",
            imgsrc: "https://img.wikifx.com/flag/2fb04b36ab78f123/LC.png_wiki-template-global",
            code: "001758"
        },
        {
            name: "S",
            title: "圣基茨和尼维斯",
            imgsrc: "https://img.wikifx.com/flag/bd254260f584015a/KN.png_wiki-template-global",
            code: "001869"
        },
        {
            name: "S",
            title: "圣赫勒拿",
            imgsrc: "https://img.wikifx.com/flag/d56945d1e5b8f9a2/SH.png_wiki-template-global",
            code: "00290"
        },
        {
            name: "S",
            title: "圣巴泰勒米岛",
            imgsrc: "https://img.wikifx.com/flag/5a2b25a96d66757f/BL.png_wiki-template-global",
            code: "00590"
        },
        {
            name: "S",
            title: "萨尔瓦多",
            imgsrc: "https://img.wikifx.com/flag/c0e98f678feaaa5a/SV.png_wiki-template-global",
            code: "00503"
        },
        {
            name: "S",
            title: "圣诞岛",
            imgsrc: "https://img.wikifx.com/flag/a5a93dedb10c85f5/CX.png_wiki-template-global",
            code: "0061"
        },
        {
            name: "S",
            title: "斯里兰卡",
            imgsrc: "https://img.wikifx.com/flag/a0d9037002e9ef65/LK.png_wiki-template-global",
            code: "0094"
        },
        {
            name: "S",
            title: "所罗门群岛",
            imgsrc: "https://img.wikifx.com/flag/ea28e90733617ec8/SB.png_wiki-template-global",
            code: "00677"
        },
        {
            name: "T",
            title: "坦桑尼亚",
            imgsrc: "https://img.wikifx.com/flag/4a401a2431779d24/TZ.png_wiki-template-global",
            code: "00255"
        },
        {
            name: "T",
            title: "图瓦卢",
            imgsrc: "https://img.wikifx.com/flag/9afeece44d873275/TV.png_wiki-template-global",
            code: "00688"
        },
        {
            name: "T",
            title: "土库曼斯坦",
            imgsrc: "https://img.wikifx.com/flag/0d788d94f4345481/TM.png_wiki-template-global",
            code: "00993"
        },
        {
            name: "T",
            title: "土耳其",
            imgsrc: "https://img.wikifx.com/flag/9e5a3c4f42ca6119/TR.png_wiki-template-global",
            code: "0090"
        },
        {
            name: "T",
            title: "突尼斯",
            imgsrc: "https://img.wikifx.com/flag/cd9ae4cb2ccd2943/TN.png_wiki-template-global",
            code: "00216"
        },
        {
            name: "T",
            title: "特立尼达和多巴哥",
            imgsrc: "https://img.wikifx.com/flag/9115acb0a1e04209/TT.png_wiki-template-global",
            code: "001868"
        },
        {
            name: "T",
            title: "汤加",
            imgsrc: "https://img.wikifx.com/flag/2bc3dc0953aab835/TO.png_wiki-template-global",
            code: "00676"
        },
        {
            name: "T",
            title: "托克劳",
            imgsrc: "https://img.wikifx.com/flag/53ffd4c30bce0e07/TK.png_wiki-template-global",
            code: "00690"
        },
        {
            name: "T",
            title: "泰国",
            imgsrc: "https://img.wikifx.com/flag/a7c2bd12dd2df53c/TH.png_wiki-template-global",
            code: "0066"
        },
        {
            name: "T",
            title: "塔吉克斯坦",
            imgsrc: "https://img.wikifx.com/flag/2fe7c185a8274bac/TJ.png_wiki-template-global",
            code: "00992"
        },
        {
            name: "W",
            title: "瓦利斯和富图纳",
            imgsrc: "https://img.wikifx.com/flag/b06f611523c0d020/WF.png_wiki-template-global",
            code: "00681"
        },
        {
            name: "W",
            title: "委内瑞拉",
            imgsrc: "https://img.wikifx.com/flag/1bd9b0fa0159103d/VE.png_wiki-template-global",
            code: "0058"
        },
        {
            name: "W",
            title: "乌兹别克斯坦",
            imgsrc: "https://img.wikifx.com/flag/249dab3c31906b4b/UZ.png_wiki-template-global",
            code: "00998"
        },
        {
            name: "W",
            title: "乌拉圭",
            imgsrc: "https://img.wikifx.com/flag/2586ff913854a844/UY.png_wiki-template-global",
            code: "00598"
        },
        {
            name: "W",
            title: "乌克兰",
            imgsrc: "https://img.wikifx.com/flag/5e03e8e3307b5b71/UA.png_wiki-template-global",
            code: "00380"
        },
        {
            name: "W",
            title: "乌干达",
            imgsrc: "https://img.wikifx.com/flag/cff273e672b3acc7/UG.png_wiki-template-global",
            code: "00256"
        },
        {
            name: "W",
            title: "瓦努阿图",
            imgsrc: "https://img.wikifx.com/flag/7571353d52a984d0/VU.png_wiki-template-global",
            code: "00678"
        },
        {
            name: "W",
            title: "危地马拉",
            imgsrc: "https://img.wikifx.com/flag/a175104eed40f0d3/GT.png_wiki-template-global",
            code: "00502"
        },
        {
            name: "W",
            title: "文莱",
            imgsrc: "https://img.wikifx.com/flag/490e37c1258738a1/BN.png_wiki-template-global",
            code: "00673"
        },
        {
            name: "W",
            title: "维尔京群岛",
            imgsrc: "https://img.wikifx.com/flag/797aad52f98db63d/VG.png_wiki-template-global",
            code: "001284"
        },
        {
            name: "X",
            title: "新西兰",
            imgsrc: "https://img.wikifx.com/flag/9a184ad1d448afe5/NZ.png_wiki-template-global",
            code: "0064"
        },
        {
            name: "X",
            title: "叙利亚",
            imgsrc: "https://img.wikifx.com/flag/9889bbf873e7c2de/SY.png_wiki-template-global",
            code: "00963"
        },
        {
            name: "X",
            title: "西撒哈拉",
            imgsrc: "https://img.wikifx.com/flag/906137902c9832d2/EH.png_wiki-template-global",
            code: "00212"
        },
        {
            name: "X",
            title: "西班牙",
            imgsrc: "https://img.wikifx.com/flag/e772ab66f0aad2ef/ES.png_wiki-template-global",
            code: "0034"
        },
        {
            name: "X",
            title: "新加坡",
            imgsrc: "https://img.wikifx.com/flag/a3b71275d25ab1b4/SG.png_wiki-template-global",
            code: "0065"
        },
        {
            name: "X",
            title: "新喀里多尼亚",
            imgsrc: "https://img.wikifx.com/flag/b500fd2d3fd701a5/NC.png_wiki-template-global",
            code: "00687"
        },
        {
            name: "X",
            title: "匈牙利",
            imgsrc: "https://img.wikifx.com/flag/13b88c2fe23dcbec/HU.png_wiki-template-global",
            code: "0036"
        },
        {
            name: "X",
            title: "希腊",
            imgsrc: "https://img.wikifx.com/flag/2e0de5875d55189e/GR.png_wiki-template-global",
            code: "0030"
        },
        {
            name: "Y",
            title: "英国",
            imgsrc: "https://img.wikifx.com/flag/52c9e8fc8d7d65f6/UK.png_wiki-template-global",
            code: "0044"
        },
        {
            name: "Y",
            title: "也门",
            imgsrc: "https://img.wikifx.com/flag/c78f494840f05187/YE.png_wiki-template-global",
            code: "00967"
        },
        {
            name: "Y",
            title: "越南",
            imgsrc: "https://img.wikifx.com/flag/5617a7f7260ccb29/VN.png_wiki-template-global",
            code: "0084"
        },
        {
            name: "Y",
            title: "约旦",
            imgsrc: "https://img.wikifx.com/flag/d1105dd93c39e6e1/JO.png_wiki-template-global",
            code: "00962"
        },
        {
            name: "Y",
            title: "牙买加",
            imgsrc: "https://img.wikifx.com/flag/c98f911ffbc794f5/JM.png_wiki-template-global",
            code: "001876"
        },
        {
            name: "Y",
            title: "意大利",
            imgsrc: "https://img.wikifx.com/flag/cb6de321930cf345/IT.png_wiki-template-global",
            code: "0039"
        },
        {
            name: "Y",
            title: "以色列",
            imgsrc: "https://img.wikifx.com/flag/f0dad76870d7ede6/IL.png_wiki-template-global",
            code: "00972"
        },
        {
            name: "Y",
            title: "伊拉克",
            imgsrc: "https://img.wikifx.com/flag/8bc1672591fd8833/IQ.png_wiki-template-global",
            code: "00964"
        },
        {
            name: "Y",
            title: "伊朗",
            imgsrc: "https://img.wikifx.com/flag/f26bbd58a8cbbad2/IR.png_wiki-template-global",
            code: "0098"
        },
        {
            name: "Y",
            title: "印尼",
            imgsrc: "https://img.wikifx.com/flag/73e04ce3ec720dd1/ID.png_wiki-template-global",
            code: "0062"
        },
        {
            name: "Y",
            title: "印度",
            imgsrc: "https://img.wikifx.com/flag/d7ed3e7b4fdbf486/IN.png_wiki-template-global",
            code: "0091"
        },
        {
            name: "Y",
            title: "印度洋领地",
            imgsrc: "https://img.wikifx.com/flag/c43ab22bff0bd9d8/IO.png_wiki-template-global",
            code: "00246"
        },
        {
            name: "Y",
            title: "亚美尼亚",
            imgsrc: "https://img.wikifx.com/flag/56b8212e569dbf2e/AM.png_wiki-template-global",
            code: "00374"
        },
        {
            name: "Z",
            title: "中国",
            imgsrc: "https://img.wikifx.com/flag/7d8833382673bab2/CN.png_wiki-template-global",
            code: "0086"
        },
        {
            name: "Z",
            title: "赞比亚",
            imgsrc: "https://img.wikifx.com/flag/133fa9c2b1351606/ZM.png_wiki-template-global",
            code: "00260"
        },
        {
            name: "Z",
            title: "泽西岛",
            imgsrc: "https://img.wikifx.com/flag/28a10a4a128a408c/JE.png_wiki-template-global",
            code: "0044"
        },
        {
            name: "Z",
            title: "中国澳门",
            imgsrc: "https://img.wikifx.com/flag/ce4185888ecf61fb/MO.png_wiki-template-global",
            code: "00853"
        },
        {
            name: "Z",
            title: "中国香港",
            imgsrc: "https://img.wikifx.com/flag/ccc558d92f93bcf8/HK.png_wiki-template-global",
            code: "00852"
        },
        {
            name: "Z",
            title: "直布罗陀",
            imgsrc: "https://img.wikifx.com/flag/efabc7a908c3768c/GI.png_wiki-template-global",
            code: "00350"
        },
        {
            name: "Z",
            title: "中国台湾",
            imgsrc: "https://img.wikifx.com/flag/6be3087ca199f440/TW.png_wiki-template-global",
            code: "00886"
        },
        {
            name: "Z",
            title: "智利",
            imgsrc: "https://img.wikifx.com/flag/7246f122016869b3/CL.png_wiki-template-global",
            code: "0056"
        },
        {
            name: "Z",
            title: "乍得",
            imgsrc: "https://img.wikifx.com/flag/555aee7519548ff7/TD.png_wiki-template-global",
            code: "00235"
        },
        {
            name: "Z",
            title: "中非",
            imgsrc: "https://img.wikifx.com/flag/c5e62129e654698c/CF.png_wiki-template-global",
            code: "00236"
        }

    ];
    return list;
}