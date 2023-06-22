// 定义图片数组
var arrays = {
  climbing: ['010006', '010010', '010011', '016006', '018006', '018011', '021011', '022006', '024010'],
  swim: ['011002', '025000', '026000', '027000'],
  gym: ['010002', '010010', '010011', '013002', '013003', '013010', '013011', '014002', '014003', '014011', '015002', '015010', '015011', '016002', '016003', '018002', '018003', '018011', '019002', '019003', '020002', '020003', '020010', '021002', '021003', '021011', '022002', '022003', '024010'],
  leisure: ['001000', '002000', '003000', '004000', '005000', '006000', '007000', '008000', '009000', '010002', '010004', '010006', '010007', '010008', '010009', '012001', '012002', '012003', '012004', '012005', '012006', '012007', '012008', '013001', '013002', '013003', '013004', '013005', '013006', '013007', '013008', '013009', '014002', '014003', '014004', '015001', '015002', '015004', '015005', '015006', '015008', '016002', '016003', '016004', '016006', '016007', '017005', '018002', '018003', '018004', '018006', '018008', '018009', '019001', '019002', '019003', '019004', '020001', '020002', '020003', '020004', '020005', '020006', '020008', '020009', '021002', '021003', '021004', '021006', '021007', '022002', '022003', '022004', '022006', '022007', '023005', '023007'],
  work: ['001000', '003000', '004000', '005000', '006000', '008000', '009000', '010002', '010004', '010006', '010007', '010008', '010009', '012002', '012003', '012004', '012005', '012006', '012007', '012008', '013001', '013002', '013003', '013004', '013005', '013006', '013007', '013008', '013009', '014002', '014003', '014004', '015001', '015002', '015004', '015005', '015006', '015008', '016002', '016003', '016004', '016006', '016007', '017005', '018002', '018003', '018004', '018006', '018008', '018009', '019001', '019002', '019003', '019004', '020001', '020002', '020003', '020004', '020005', '020006', '020008', '020009', '021002', '021003', '021004', '021006', '021007', '022002', '022003', '022004', '022006', '022007', '023005', '023007']
};

// 高权重数组
var highWeightArray = ['005000', '010002', '012012', '013002', '013004', '013005', '013010', '014011', '015011', '016002', '016012', '017005', '017012', '018002', '018012', '020005', '020012', '021003', '021012', '023005', '023012', '024010'];

// 高权重数据的映射
var highWeightMap = {};

// 将高权重数据添加到组的高权重数据中
function addHighWeightDataToGroup(group, element) {
  if (group in highWeightMap) {
    highWeightMap[group].push(element);
  } else {
    highWeightMap[group] = [element];
  }
}

// 检查并将高权重数据添加到相应组
function checkAndAddHighWeightData(group, element) {
  if (arrays[group].includes(element)) {
    addHighWeightDataToGroup(group, element);
  }
}

// 将高权重数组中的元素分配到相应的组
for (var i = 0; i < highWeightArray.length; i++) {
  var element = highWeightArray[i];
  checkAndAddHighWeightData('climbing', element);
  checkAndAddHighWeightData('swim', element);
  checkAndAddHighWeightData('gym', element);
  checkAndAddHighWeightData('leisure', element);
  checkAndAddHighWeightData('work', element);
}

// 获取当前日期并格式化为 MM-DD
function getCurrentDate() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  return (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}

// 从数组中随机选择一个元素
function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// 更新历史记录
function updateHistory(buttonId, imageName) {
  var historyElement = document.getElementById(buttonId + "-history");
  var listItem = document.createElement("li");
  var link = document.createElement("a");
  var checkbox = document.createElement("input"); // 新增复选框
  checkbox.type = "checkbox"; // 设置复选框类型
  checkbox.value = imageName; // 设置复选框的值
  link.textContent = getCurrentDate() + ": " + imageName;
  link.href = "/Users/ziye.ouyang/Downloads/OOTD project/" + buttonId + "/" + imageName + ".jpg";
  link.target = "_blank";
  listItem.appendChild(link);
  listItem.appendChild(checkbox); // 将复选框添加到历史记录项中
  historyElement.appendChild(listItem);
}

// 记录按钮点击次数和历史记录
var buttonClickCount = {};

// 获取最近5次点击的历史记录
function getRecentHistory(buttonId) {
  var historyElement = document.getElementById(buttonId + "-history");
  var historyItems = historyElement.getElementsByTagName("li");
  var recentHistory = [];
  for (var i = historyItems.length - 1; i >= 0 && recentHistory.length < 5; i--) {
    var checkbox = historyItems[i].getElementsByTagName("input")[0];
    if (checkbox.checked) {
      continue; // 跳过已选中的项
    }
    var imageName = checkbox.value;
    recentHistory.push(imageName);
  }
  return recentHistory;
}

// 点击工作按钮
document.getElementById("work-button").addEventListener("click", function () {
  var workArray = arrays.work.concat(highWeightMap['work'] || []);
  var recentHistory = getRecentHistory("work");
  var availableImages = workArray.filter(function (imageName) {
    return !recentHistory.includes(imageName);
  });
  var randomImage = getRandomElement(availableImages);
  var imagePath = "/Users/ziye.ouyang/Downloads/OOTD project/work/" + randomImage + ".jpg";
  document.getElementById("result-image").src = imagePath;
  updateHistory("work", randomImage);
});

// 点击出去玩按钮
document.getElementById("leisure-button").addEventListener("click", function () {
  var leisureArray = arrays.leisure.concat(highWeightMap['leisure'] || []);
  var recentHistory = getRecentHistory("leisure");
  var availableImages = leisureArray.filter(function (imageName) {
    return !recentHistory.includes(imageName);
  });
  var randomImage = getRandomElement(availableImages);
  var imagePath = "/Users/ziye.ouyang/Downloads/OOTD project/leisure/" + randomImage + ".jpg";
  document.getElementById("result-image").src = imagePath;
  updateHistory("leisure", randomImage);
});

// 点击爬山按钮
document.getElementById("climbing-button").addEventListener("click", function () {
  var climbingArray = arrays.climbing.concat(highWeightMap['climbing'] || []);
  var recentHistory = getRecentHistory("climbing");
  var availableImages = climbingArray.filter(function (imageName) {
    return !recentHistory.includes(imageName);
  });
  var randomImage = getRandomElement(availableImages);
  var imagePath = "/Users/ziye.ouyang/Downloads/OOTD project/climbing/" + randomImage + ".jpg";
  document.getElementById("result-image").src = imagePath;
  updateHistory("climbing", randomImage);
});

// 点击健身按钮
document.getElementById("gym-button").addEventListener("click", function () {
  var gymArray = arrays.gym.concat(highWeightMap['gym'] || []);
  var recentHistory = getRecentHistory("gym");
  var availableImages = gymArray.filter(function (imageName) {
    return !recentHistory.includes(imageName);
  });
  var randomImage = getRandomElement(availableImages);
  var imagePath = "/Users/ziye.ouyang/Downloads/OOTD project/gym/" + randomImage + ".jpg";
  document.getElementById("result-image").src = imagePath;
  updateHistory("gym", randomImage);
});

// 点击游泳按钮
document.getElementById("swim-button").addEventListener("click", function () {
  var swimArray = arrays.swim.concat(highWeightMap['swim'] || []);
  var recentHistory = getRecentHistory("swim");
  var availableImages = swimArray.filter(function (imageName) {
    return !recentHistory.includes(imageName);
  });
  var randomImage = getRandomElement(availableImages);
  var imagePath = "/Users/ziye.ouyang/Downloads/OOTD project/swim/" + randomImage + ".jpg";
  document.getElementById("result-image").src = imagePath;
  updateHistory("swim", randomImage);
});
