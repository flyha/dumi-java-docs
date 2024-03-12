---
nav: 基础
group:
  title: 进阶
  index: 0
---

# 面向对象高级

面向对象是写 Java 程序的核心套路，如何你不懂面向对象，那就相当于 Java 你白学了。

前面我们说过面向对象最核心的套路是：**设计对象来处理数据，解决问题。** 如果你把面向对象高级这一部分课程学好，你设计出来的对象将更加好用。

## 静态

接下来，我们学习一下面向对象编程中很常见的一个关键字 static.

static 读作静态，可以用来修饰成员变量，也能修饰成员方法。我们先来学习 static 修饰成员变量。

### static 修饰成员变量

Java 中的成员变量按照有无 static 修饰分为两种：**类变量、实例变量**。它们的区别如下图所示：

![1663977705413](./images/ad-01-1.png)

由于静态变量是属于类的，只需要通过类名就可以调用：**`类名.静态变量`**

实例变量是属于对象的，需要通过对象才能调用：**`对象.实例变量`**

- 下面是代码演示（注意静态变量，和实例变量是如何调用的）

![1663978511018](./images/ad-01-2.png)

为了让大家对于这两种成员变量的执行过程理解更清楚一点，在这里给大家在啰嗦几句，我们来看一下上面代码的内存原理。

![1663978808670](./images/ad-01-3.png)

- **最后总结一下**

```java
- 1.类变量：属于类，在内存中只有一份，用类名调用
- 2.实例变量：属于对象，每一个对象都有一份，用对象调用
```

### static 修饰成员变量的应用场景

学习完 static 修饰成员变量的基本使用之后，接下来我们学习一下 static 修饰成员变量在实际工作中的应用。

在实际开发中，如果某个数据只需要一份，且希望能够被共享（访问、修改），则该数据可以定义成类变量来记住。

> **我们看一个案例**
>
> **需求：系统启动后，要求用于类可以记住自己创建了多少个用户对象。**

- 第一步：先定义一个`User`类，在用户类中定义一个 static 修饰的变量，用来表示在线人数；

```java
public class User{
    public static int number;
    //每次创建对象时，number自增一下
    public User(){
        User.number++;
    }
}
```

- 第二步：再写一个测试类，再测试类中创建 4 个 User 对象，再打印 number 的值，观察 number 的值是否再自增。

```java
public class Test{
    public static void main(String[] args){
        //创建4个对象
        new User();
        new User();
        new User();
        new User();

        //查看系统创建了多少个User对象
        System.out.println("系统创建的User对象个数：" + User.number);
    }
}
```

运行上面的代码，查看执行结果是：**`系统创建的User对象个数：4`**

### static 修饰成员方法

学习完 static 修饰成员变量之后，接下来我们学习 static 修饰成员方法。成员方法根据有无 static 也分为两类：**类方法、实例方法**

![1664004813041](./images/ad-01-4.png)

> 有 static 修饰的方法，是属于类的，称为**类方法**；调用时直接用类名调用即可。
>
> 无 static 修饰的方法，是属于对象的，称为实例方法；调用时，需要使用对象调用。

我们看一个案例，演示类方法、实例方法的基本使用

- 先定义一个 Student 类，在类中定义一个类方法、定义一个实例方法

```java
public class Student{
    double score;

    // 类方法：
    public static void printHelloWorld{
      System.out.println("Hello World!");
      System.out.println("Hello World!");
    }

    // 实例方法（对象的方法）
    public void printPass(){
      // 打印成绩是否合格
      System.out.println(score >= 60 ? "成绩合格" : "成绩不合格");
    }
}
```

- 在定义一个测试类，注意类方法、对象方法调用的区别

```java
public class Test2 {
    public static void main(String[] args){
        // 1.调用Student类中的类方法
        Student.printHelloWorld();

        // 2.调用Student类中的实例方法
        Student s = new Student();
        s.printPass();

        // 使用对象也能调用类方法【不推荐，IDEA连提示都不给你，你就别这么用了】
        s.printHelloWorld();
    }
}
```

搞清楚类方法和实例方法如何调用之后，接下来再聊一聊 static 修饰成员方法的内存原理。

```java
1.类方法：static修饰的方法，可以被类名调用，是因为它是随着类的加载而加载的；
		 所以类名直接就可以找到static修饰的方法

2.实例方法：非static修饰的方法，需要创建对象后才能调用，是因为实例方法中可能会访问实例变量，而实例变量需要创建对象后才存在。
		  所以实例方法，必须创建对象后才能调用。
```

![1664005554987](./images/ad-01-5.png)

关于 static 修饰成员变量、和静态修饰成员方法这两种用法，到这里就学习完了。

### 工具类

学习完 static 修饰方法之后，我们讲一个有关类方法的应用知识，叫做工具类。

如果一个类中的方法全都是静态的，那么这个类中的方法就全都可以被类名直接调用，由于调用起来非常方便，就像一个工具一下，所以把这样的类就叫做工具类。

- 我们写一个生成验证码的工具类

```java
public class MyUtils {
    public static String createCode(int n){
        //1.定义一个字符串，用来记录产生的验证码
        String code = "";

        //2.验证码是由所有的大写字母、小写字母或者数字字符组成
        //这里先把所有的字符写成一个字符串，一会从字符串中随机找字符
        String data = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ";

        //3.循环n次，产生n个索引,再通过索引获取字符
        Random r = new Random();
        for(int i = 0; i < n; i++){
            int index = r.nextInt(data.length());
            char ch = data.charAt(index);
            //4.把获取到的字符，拼接到code验证码字符串上。
            code += ch;
        }

        //最后返回code,code的值就是验证码
        return code;
    }
}
```

```java
// 比如这是一个注册界面
public class registerDemo{
  public static void main(String[] args) {
    System.out.println(MyUtils.createCode());
  }
}
```

工具类的使用就是这样子的，学会了吗？

> 在补充一点，工具类里的方法全都是静态的，推荐用类名调用为了防止使用者用对象调用。我们可以把工具类的构造方法私有化。

```java
public class MyUtils {
    //私有化构造方法：这样别人就不能使用构造方法new对象了
    private MyUtils() {
    }
    //类方法
    public static String createCode(int n) {
       ...
    }
}
```

### static 的注意事项

到现在在我们已经学会了 static 修饰的变量、方法如何调用了。但是有一些注意事项还是需要给大家说明一下，目的是让大家知道，使用 static 写代码时，如果出错了，要知道为什么错、如何改正。

![1664007168869](./images/ad-01-6.png)

```java
public class Student {
    static String schoolName; // 类变量
    double score; // 实例变量

    // 1、类方法中可以直接访问类的成员，不可以直接访问实例成员。
    public static void printHelloWorld(){
        // 注意：同一个类中，访问类成员，可以省略类名不写。
        schoolName = "清华";
        printHelloWorld2();

        System.out.println(score); // 报错的
        printPass(); // 报错的

        system.out.println(this); // 报错的
    }

	  // 类方法
    public static void printHelloWorld2(){

    }

    // 实例方法
    public void printPass2(){

    }

    // 实例方法
    // 2、实例方法中既可以直接访问类成员，也可以直接访问实例成员。
    // 3、实例方法中可以出现this关键字，类方法中不可以出现this关键字的
    public void printPass(){
        schoolName = "北大"; // 对的
        printHelloWorld2(); // 对的

        System.out.println(score); //对的
        printPass2(); //对的

        System.out.println(this); //对的
    }
}
```

### static 应用（代码块）

接下来我们再补充讲解一个知识点，叫代码块；代码块根据有无 static 修饰分为两种：静态代码块、实例代码块
