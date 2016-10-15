package com.bright.amp.authc.vo;


/**
 * 用户登录时加载的菜单
 * 
 * @author hlj
 */
public class UserMenu 
{
    /**
     * 字段含义：菜单ID
     */
    private String            menuId;
    /**
     * 字段含义：菜单名称
     */
    private String            menuName;
    /**
     * 字段含义：菜单组ID 如果为顶级默认为0
     */
    private String            parentMenuId;
    /**
     * 字段含义：菜单组名称
     */
    private String            menuUrl;
    /**
     * 字段含义：菜单图片显示路径
     */
    private String            iconPath;

    public String getMenuId()
    {
        return menuId;
    }

    public void setMenuId(String menuId)
    {
        this.menuId = menuId;
    }

    public String getMenuName()
    {
        return menuName;
    }

    public void setMenuName(String menuName)
    {
        this.menuName = menuName;
    }

    public String getParentMenuId()
    {
        return parentMenuId;
    }

    public void setParentMenuId(String parentMenuId)
    {
        this.parentMenuId = parentMenuId;
    }

    public String getMenuUrl()
    {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl)
    {
        this.menuUrl = menuUrl;
    }

    public String getIconPath()
    {
        return iconPath;
    }

    public void setIconPath(String iconPath)
    {
        this.iconPath = iconPath;
    }
}
