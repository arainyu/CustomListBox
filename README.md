CustomListBox
=============

A custom control by tag of select, like a list box, as a jQuery Plugin

use case: 
$('#multipleSelect').customSelectBox();

自定义多选列表
使用HTML原始标签select定义，可以用select原始ID来进行获取值和赋值； 可以自定义样式；更人性化的图标。
同时也可以用asp.net的ListBox使用,原理还是一样select的标签都可以使用，取值和赋值都可以在select标签上操作。

<p>
<code>
            &lt;asp:ListBox ID="SelectBox" runat="server" data-maxSelectedCount="3" SelectionMode="Multiple"&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp; &lt;asp:ListItem&gt;aaaaaaaaaaaaaa&lt;/asp:ListItem&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;      &lt;asp:ListItem Selected="True"&gt;bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb&lt;/asp:ListItem&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;      &lt;asp:ListItem Selected="True"&gt;ccccccccccccccccccccccccccccccc&lt;/asp:ListItem&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;      &lt;asp:ListItem Selected="True"&gt;dddddddddddddddddddddd&lt;/asp:ListItem&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;      &lt;asp:ListItem Selected="True"&gt;eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&lt;/asp:ListItem&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;      &lt;asp:ListItem Selected="True"&gt;ffffffffffffffffffffffffffffffff&lt;/asp:ListItem&gt;<br/>
            &lt;/asp:ListBox&gt;
</code>
</p><p>
<code>
$('#SelectBox').customSelectBox();
</code></p>
